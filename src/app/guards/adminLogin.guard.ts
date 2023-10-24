import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { Router } from '@angular/router';
import { decodeToken2 } from '../helper/jwt.helper';

@Injectable({
  providedIn: 'root'
})

export class TokenGuardAdminLogin implements CanActivate {
  constructor(private router: Router, private localStorageService : LocalStorageService) { }

   canActivate(): boolean {
    const token : any = decodeToken2(this.localStorageService.getItem('token'));
    if (token){
      if (token.user.role === 'admin') {
        return true;
      } 
    }
    return false;
    }
  }

