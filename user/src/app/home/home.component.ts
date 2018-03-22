import { Component, OnInit } from '@angular/core';
import { AdminAuthService } from '../services/admin-auth.service';
import { ActivatedRoute , Router , Route } from '@angular/router';

declare var $ : any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor(private AdminAuth:AdminAuthService , private router:Router) { }
  items=[];
  all_articals;
  side_banner = [];
  remaining_items = [];
  ngOnInit() {

    // getting all articals
    this.AdminAuth.get_all_articals().subscribe(data => {
      console.log(data);
      this.all_articals = data.msg;
      this.all_articals.forEach(element => {
        element['new_image'] = element.image.replace('public','');
        if(element.main === true){
          this.items.push(element);
        }
        if(element.side === true){
          this.side_banner.push(element);
        }
        if(element.side !== true && element.main !== true){
          this.remaining_items.push(element);
        }
        console.log(this.remaining_items);
        // let str = ""
        // Console.log()
      });
    });
  }
}
