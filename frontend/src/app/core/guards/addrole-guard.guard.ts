import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { EncryptionService } from '../services/encryption.service';

@Injectable({
  providedIn: 'root'
})
export class AddRoleGuard implements CanActivate {

  constructor(private encryptionService : EncryptionService,private router:Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    const authoritiesCrypted =localStorage.getItem('authorities') 
    const authorities =this.encryptionService.decrypt(authoritiesCrypted!,"2f7")
    
    if (authorities.includes("ADD::ROLE")) {
      return true;
    } else {
      this.router.navigate(['/notfound']);
      return false;
    }
  }
}
