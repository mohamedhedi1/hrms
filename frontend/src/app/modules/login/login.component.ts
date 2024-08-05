import { Component } from '@angular/core';
import { AuthenticationRequest } from '../../core/models/AuthentificationRequest';
import { AuthenticationResponse } from '../../core/models/AuthentificationResponse';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { EncryptionService } from '../../core/services/encryption.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  errorMessage!: string;
  authRequest: AuthenticationRequest = {};
  authResponse: AuthenticationResponse = {};
  constructor(
    private encryptionService: EncryptionService,
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {}

  authenticate() {
    this.authService.login(this.authRequest).subscribe({
      next: (response) => {
        this.authResponse = response;
        if (response.access_token == 'sms') {
          const token = {
            email: this.authRequest.email,
            method: response.access_token,
          };
          localStorage.setItem('code', JSON.stringify(token));
          this.router.navigate(['/sendcode']);
        } else if (response.access_token == 'mail') {
          const token = {
            email: this.authRequest.email,
            method: response.access_token,
          };
          localStorage.setItem('code', JSON.stringify(token));
          this.router.navigate(['/sendcode']);
        } else {
          localStorage.setItem('token', response.access_token as string);
          this.userService.getUser(this.authRequest.email).subscribe({
            next: (userData: any) => {
              const user = {
                firstname: userData.firstname,
                lastname: userData.lastname,
                email: userData.email,
              };

              const authorities = this.encryptionService.encrypt(
                JSON.stringify(userData.authorities),
                '2f7'
              );
              localStorage.setItem('authorities', authorities);
              localStorage.setItem('user', JSON.stringify(user));
              this.router.navigate(['/home/dashboard']);
            },
            error: (err: any) => {},
          });
        }
      },
      error: (error) => {
        this.errorMessage = 'Invalid email or password';
      },
    });
  }
}
