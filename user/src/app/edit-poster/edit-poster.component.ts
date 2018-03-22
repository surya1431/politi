import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Route , Router } from "@angular/router";
import { AdminAuthService } from "../services/admin-auth.service";
import * as Quill from 'quill';
declare var $:any;

@Component({
  selector: 'app-edit-poster',
  templateUrl: './edit-poster.component.html',
  styleUrls: ['./edit-poster.component.css']
})
export class EditPosterComponent implements OnInit {

  constructor(private adminAuth:AdminAuthService ,private router:Router , private activatedRoute:ActivatedRoute) { }

id:string;
title:string;
description:string;
image:string;
img;
  ngOnInit() {
    var toolbarOptions = [
      ['bold','italic','underline','strike'],
      ['blockquote','code-block'],
      [{'header':[1,2,3,4,5,6,false]}],
      [{'list':'orderd'},{'list':'bullet'}],
      [{'script':'sub'},{'script':'super'}],
      [{'inddent':'-1'},{'indent':'+1'}],
      [{'size':['small',false,'large','huge']}],
      ['link','image','video'],
      [{'color':[]},{'background':[]}],
      [{'font':[]}],
      [{'align':[]}]
    ]
   
  var quill = new Quill('#editor',{
    modules:{
      toolbar:{
        container:toolbarOptions,
        // handlers: {
        //   image:imageHandler
        // }
      }
    },
    theme: 'snow'
  });

    // this.id = this.activatedRoute.queryParams['_value'].id;
    this.id = this.router.url.replace('/edit-poster/','');
    console.log(this.id);
    this.adminAuth.get_poster(this.id).subscribe(dat => {
      console.log(dat)
      let d = dat.msg;
      quill.setContents(JSON.parse(d.content));
      this.title = d.title;
      this.description = d.description;
      this.image = d.image.replace('public','');
      this.img = d.image;
    });

    // save poster
    $('#save_delta').click(() =>{
        if($('#image').prop('files')[0] == null || $('#image').prop('files')[0] == undefined || $('#image').prop('files')[0] == ''){
          this.img = this.img;
        }else{
          this.img = $('#image').prop('files')[0];
        }
      var delta = quill.getContents();
      let formData = new FormData();
      formData.append('title',$('#title').val());
      formData.append('description',$('#description').val());
      formData.append('image',this.img);
      formData.append('artical',JSON.stringify(delta));
      formData.append('poster_id',this.id);

      this.adminAuth.save_edited_poster(formData).subscribe(dat => {
        console.log(dat);
      });
  });
  }

}
