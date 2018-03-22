import { Component, OnInit } from '@angular/core';
import { AdminAuthService } from "../services/admin-auth.service";
import * as Quill from 'quill';
declare var $:any;
@Component({
  selector: 'app-poster',
  templateUrl: './poster.component.html',
  styleUrls: ['./poster.component.css']
})
export class PosterComponent implements OnInit {

  constructor(private adminAuth:AdminAuthService) { }

quilldata:any;
title:string;
description:string;

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
      }
    },
    theme: 'snow'
  });

  var quill_dis = new Quill('#quill-dis',{
  });

  $('#save_delta').click(() =>{
      var delta = quill.getContents();
      quill_dis.setContents(delta);
      quill_dis.enable(false);
      let formData = new FormData();
      formData.append('title',$('#title').val());
      formData.append('description',$('#description').val());
      formData.append('image',$('#image').prop('files')[0]);
      formData.append('artical',JSON.stringify(delta));
      this.adminAuth.post_artical(formData).subscribe(dat => {
        console.log(dat);
      });
  });
}

}
