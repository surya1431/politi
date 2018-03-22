const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const multer = require('multer');
const Path = require('path');

const Admin = require('../models/admin');
const Artical = require('../models/artical');
const config = require('../config/database');

const storage = multer.diskStorage({
    destination:"./public/uploads/",
    filename:(req,file,cb) => {
        cb(null,file.fieldname+Date.now()+Path.extname(file.originalname)); 
    }
});
const upload = multer({  
    storage : storage 
}).any("image"); 

// register
router.post("/register-admin",(req,res) => {
  let newAdmin = new Admin({
      email:req.body.email,
      password:req.body.password
  });
    Admin.addUser(newAdmin,(err,admin)=> {
        if(err){
            res.json({success:false,msg:err});
        }else{
            res.json({success:true,msg:admin});
        }
    });    
});
// login
router.post("/login-admin",(req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    Admin.find({email:email},(err,admin) => {
        if(err){
            res.json({success:false,msg:err});
        }
        if(!admin){
            res.json({success:false,msg:"No admin found"});
        }
        if(admin){
            Admin.comparePassword(password,admin[0].password,(err,isMatch) => {
                if(err){
                    res.json({success:false,msg:err});
                }
                if(!isMatch){
                    res.json({success:false,msg:"password not matched"});
                }
                if(isMatch){
                    const token = jwt.sign({data:admin},config.secret,{expiresIn:604800});
                    res.json({
                        success:true,
                        token:token,
                        msg:admin[0].email});
                }
            });           
        }
    });
});

// post artical
router.post("/post_artical",(req,res) => {

    upload(req,res,(err) => {
        console.log(req);
        let a = req.body;      
        let newArtical = new Artical({
            title:a.title,
            description:a.description,
            content:a.artical,
            image:req.files[0].path,
            postedOn:moment(),
            updatedon:moment()        
        });
        newArtical.save((err,art) => {
            if(err){
                res.json({success:false,msg:err});
            }else{
                res.json({success:true,msg:art});
            }
        });
    });
});

// get all articals
router.get("/get_all_articals/",(req,res) => {
    Artical.find((err,art) => {
        if(err){
            res.json({success:false,msg:err});
        }else{
            res.json({success:true,msg:art});
        }
    });
});

// get poster
router.get("/get_poster/:id",(req,res) => {
    const id = req.params.id;
    Artical.findById({_id:id},(err,art) => {
        if(err){
            res.json({success:false,msg:err});
        }else{
            res.json({success:true,msg:art});
        }
    });
});

// save edited poster
router.post("/save_edited_poster",(req,res) => {
        upload(req,res,(err) => {
            let b= req.body;
            let image;
             let i;
            if(b.image == null || b.image == undefined || b.image == ''){
                image = req.files[0].path;
                i=1;
            }else{
                image = b.image;
                i=1;
            }
           if(i=1){
               Artical.findByIdAndUpdate({_id:b.poster_id},{$set:{
                   title:b.title,
                   description:b.description,
                   image:image,
                   content:b.artical,
                   updatedon:moment()
               }}).exec((err,art) => {
                   if(err){
                       res.json({success:false,msg:err});
                   }else{
                       res.json({success:true,msg:art});
                   }
               });
           }
        });
});

// change poster main
router.post("/change_poster_main",(req,res) => {
    let id = req.body.id;
    Artical.findById({_id:id},(err,art) => {
        if(err){
            res.json({success:false,msg:err});
        }else{
            if(art.main === false){
                Artical.findByIdAndUpdate({_id:id},{$set:{main:true,updatedon:moment()}}).exec((err2,art2) => {
                    if(err2){
                        res.json({success:false,msg:err2});
                    }else{
                        res.json({success:true,msg:art2,main:true});
                    }
                })
            }
            if(art.main === true){
                Artical.findByIdAndUpdate({_id:id},{$set:{main:false,updatedon:moment()}}).exec((err3,art3) => {
                    if(err3){
                        res.json({success:false,msg:err3});
                    }else{
                        res.json({success:true,msg:art3,main:false});
                    }
                });
            }
        }
    });
});

// change poster side
router.post("/change_poster_side",(req,res) => {
    let id = req.body.id;
    Artical.findById({_id:id},(err,art) => {
        if(err){
            res.json({success:false,msg:err});
        }else{
            if(art.side === false){
                Artical.findByIdAndUpdate({_id:id},{$set:{side:true,updatedon:moment()}}).exec((err2,art2) => {
                    if(err2){
                        res.json({success:false,msg:err2});
                    }else{
                        res.json({success:true,msg:art2,side:true});
                    }
                })
            }
            if(art.side === true){
                Artical.findByIdAndUpdate({_id:id},{$set:{side:false,updatedon:moment()}}).exec((err3,art3) => {
                    if(err3){
                        res.json({success:false,msg:err3});
                    }else{
                        res.json({success:true,msg:art3,side:false});
                    }
                });
            }
        }
    });
});

// delete poster
router.post('/delete_poster',(req,res) => {
   let a = req.body;
   Artical.findByIdAndRemove({_id:a._id}).exec((err,art) => {
       if(err){
           res.json({success:false,msg:err});
       }else{
           res.json({success:true,msg:art});
       }
   });
});
module.exports = router;