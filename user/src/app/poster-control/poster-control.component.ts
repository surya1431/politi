import { Component, OnInit } from '@angular/core';
import { AdminAuthService } from "../services/admin-auth.service";
import { ActivatedRoute , Router , Route } from "@angular/router";
declare var $ : any;
@Component({
  selector: 'app-poster-control',
  templateUrl: './poster-control.component.html',
  styleUrls: ['./poster-control.component.css']
})
export class PosterControlComponent implements OnInit {

  constructor(private AdminAuth:AdminAuthService , private router:Router) { }

  articals;
  added_to_main = [];
  added_to_trending = [];
  ngOnInit() {
      this.AdminAuth.get_all_articals().subscribe(art => {
        this.articals = art.msg;
        // console.log(this.articals);
        this.articals.forEach(artical => {
          if(artical.main === true){
            this.added_to_main.push(artical);
          }
          if(artical.side === true){
            this.added_to_trending.push(artical);
          }
          console.log(this.added_to_main);
          console.log(this.added_to_trending);
        });
      });
  }
  // change main status
  add_to_main(obj,event){   
    let data = {
      id:obj._id
    }
      this.AdminAuth.change_poster_main(data).subscribe( data => {
        // console.log(data);
        if(data.success === true){
          if(data.main === true){
            $(event.target).html('Added to Main');
            this.added_to_main.push(obj);
            // console.log(this.added_to_main);
          }else{
            $(event.target).html('Add to Main');
            let index = this.added_to_main.indexOf(obj);
            this.added_to_main.splice(index,1);
            // console.log(this.added_to_main);
          }
        }
      });    
  }

  // change side status
  add_to_side(obj,event){
    let data = {
      id:obj._id
    }
    this.AdminAuth.change_poster_side(data).subscribe( data => {
      // console.log(data);
      if(data.side === true){
        $(event.target).html('Added to Trending');
        this.added_to_trending.push(obj);
        // console.log(this.added_to_trending);
      }else{
        $(event.target).html('Add to Trending');
        let index = this.added_to_trending.indexOf(obj);
         this.added_to_trending.splice(index,1);
      }
    })
  }

  delete_poster(obj){
    this.AdminAuth.delete_poster(obj).subscribe(data =>  {
      if(data.success === true){
        let index = this.articals.indexOf(obj);
        this.articals.splice(index,1);
        let main_index = this.added_to_main.indexOf(obj);
        if(main_index > -1){
          this.added_to_main.splice(main_index,1);
        }
        let trending_index = this.added_to_trending.indexOf(obj);
        if(trending_index > -1){
          this.added_to_trending.splice(trending_index,1);
        }
          // console.log(this.added_to_main);
          // console.log(this.added_to_trending);
      }
    });
  }
}
