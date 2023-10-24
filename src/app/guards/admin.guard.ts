import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { Router } from '@angular/router';
import { decodeToken } from '../helper/jwt.helper';

@Injectable({
  providedIn: 'root'
})

export class TokenGuardAdmin implements CanActivate {
  constructor(private router: Router, private localStorageService : LocalStorageService) { }

   canActivate(): boolean {
    const token : any = decodeToken(this.localStorageService.getItem('token'));
    console.log(token);
    if (token.user.role === 'admin') {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }

}

// export const adminGuard: CanActivateFn = (route, state) => {
//   return true;
// };
