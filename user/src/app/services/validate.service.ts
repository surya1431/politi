import { Injectable } from '@angular/core';
import { strictEqual } from 'assert';

@Injectable()
export class ValidateService {

  constructor() { }
    validateInput(string){
      if(string == undefined || string == null || string == ''){
        return false;
      }else{
        return true;
      }
    }

    ValidateEmail(email){
      const em = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return em.test(email);
    }
    
}
