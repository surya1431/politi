const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const schema = mongoose.Schema;

const AdminSchema = schema({
   email:{
       type:String,
       required:true
   },
   password:{
       type:String,
       required:true
   }
});


const Admin = module.exports = mongoose.model('Admin',AdminSchema);

//adduser
module.exports.addUser = (newUser,callback) => {
        bcrypt.genSalt(10,(err,salt) => {
            bcrypt.hash(newUser.password,salt,(err,hash) =>{
                if(err) throw err;
                newUser.password = hash;
                newUser.save(callback);
            })
        })
}

//comparePassword
module.exports.comparePassword = (candidatePassword,hash,callback) => {
    bcrypt.compare(candidatePassword,hash,(err,isMatch) => {
        if(err) throw err;
        callback(null,isMatch);
    })
}

//getting User by email
module.exports.getUserByEmail = (email,callback) =>{
    const query = {email:email}
    User.findOne(query,callback);
}

//getting user by Id
module.exports.getUserById = (id,callback) => {
    User.findById(id,callback);

}

