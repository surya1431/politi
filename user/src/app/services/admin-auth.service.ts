import { Injectable } from '@angular/core';
import { Http , Headers} from '@angular/http'
import 'rxjs/add/operator/map';
import { tokenNotExpired } from "angular2-jwt";

@Injectable()
export class AdminAuthService {

  constructor(private http:Http) {}
    
  admin_login(admin){
      let header = new Headers();
      header.append('content-type','application/json');
      return this.http.post("http://localhost:3000/admin/login-admin",admin,{headers:header}).map(res => res.json());
      // return this.http.post("admin/login-admin",admin,{headers:header}).map(res => res.json());
    }
  
  StoreAdminData(token,email){
    localStorage.setItem('admin-token',token);
    localStorage.setItem('admin-email',email);
  }

  LoggedIn(){
    return tokenNotExpired('admin-token');
  }
  
  post_artical(poster){
    // let header = new Headers();
    // header.append('content-type','application/json');
    return this.http.post("http://localhost:3000/admin/post_artical",poster).map(res => res.json());
  }
  get_all_articals(){
    return this.http.get("http://localhost:3000/admin/get_all_articals/").map(res => res.json());
  }
  get_poster(id){
    return this.http.get("http://localhost:3000/admin/get_poster/"+id).map(res => res.json());
  }
  save_edited_poster(poster){
    return this.http.post("http://localhost:3000/admin/save_edited_poster",poster).map(res => res.json());
  }
  change_poster_main(id){
    let header = new Headers();
    header.append('content-type','application/json');
    return this.http.post("http://localhost:3000/admin/change_poster_main",id,{headers:header}).map(res => res.json());
  }
  change_poster_side(id){
    let header = new Headers();
    header.append('content-type','application/json');
    return this.http.post("http://localhost:3000/admin/change_poster_side",id,{headers:header}).map(res => res.json());
  }

  delete_poster(obj){
    let header = new Headers();
    header.append('content-type','application/json');
    return this.http.post("http://localhost:3000/admin/delete_poster",obj,{headers:header}).map(res => res.json());
  }

}
