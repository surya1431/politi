import { Component, OnInit } from '@angular/core';
import { ValidateService } from "../services/validate.service";
import { AdminAuthService } from "../services/admin-auth.service";
import { Router , ActivatedRoute , Params } from "@angular/router";
declare var $:any;
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor(private validate:ValidateService,private authService:AdminAuthService,private router:Router) { }

  // login
  authEmail:string;
  authPassword:string;

  ngOnInit() {
    $('#uname').click(() => {
      $('#login-err').css({'display':'none'});
    });
    $('#upwd').click(() => {
      $('#login-err').css({'display':'none'});
    });
  }

  activate_signin(event){
    if(event.keyCode == 13){
      this.log_in();
    }
  }
  
  log_in(){
    let admin = {
      email:this.authEmail,
      password:this.authPassword
    }
    if(this.validate.validateInput(this.authEmail) && this.validate.validateInput(this.authPassword)){
          if(this.validate.ValidateEmail(this.authEmail)){
              this.authService.admin_login(admin).subscribe(admin => {
                if(admin.success){
                  this.authService.StoreAdminData(admin.token,admin.msg)
                  this.router.navigate(['/poster']);
                }else{
                  $('#login-err').css({'display':'block'});
                  $('#login-err').html('<i class="fas fa-exclamation-triangle"></i> Email or password entred is wrong !');      
                }              
              })
          }else{
            $('#login-err').css({'display':'block'});
            $('#login-err').html('<i class="fas fa-exclamation-triangle"></i> Plaese enter a valid email !');      
          }
    }else{
      $('#login-err').css({'display':'block'});
      $('#login-err').html('<i class="fas fa-exclamation-triangle"></i> cannot be left blank !');
    }
  }
}
