import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router , Route } from "@angular/router";
import * as Quill from 'quill';
import { AdminAuthService } from "../services/admin-auth.service";
@Component({
  selector: 'app-user-poster',
  templateUrl: './user-poster.component.html',
  styleUrls: ['./user-poster.component.css']
})
export class UserPosterComponent implements OnInit {

  constructor(private activated:ActivatedRoute, private router:Router , private adminAuth:AdminAuthService) { }

  id:string;

  ngOnInit() {

    // quill initialized
    let quill = new Quill('#poster' , {});

      this.id = this.router.url.replace('/user-poster/','');
      this.adminAuth.get_poster(this.id).subscribe(data => {
        let content = JSON.parse(data.msg.content);
        quill.setContents(content);
        quill.enable(false);
      });
  }

}
