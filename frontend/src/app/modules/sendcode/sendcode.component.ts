import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { Observable, timer } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';
import { AuthenticationResponse } from '../../core/models/AuthentificationResponse';
import { EncryptionService } from '../../core/services/encryption.service';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-sendcode',
  templateUrl: './sendcode.component.html',
  styleUrl: './sendcode.component.css'
})
export class SendcodeComponent implements OnInit {
  errorMessage!: string;
  authResponse: AuthenticationResponse = {};
  email!:string
  method! : string 
  countdown?: Observable<string> 
  
  constructor( private authService : AuthService,
    private encryptionService: EncryptionService,
    private router: Router,
    private userService: UserService
  ) {}

  async ngOnInit() {
    const codeString = await localStorage.getItem('code');
    if (codeString) {
      const code = JSON.parse(codeString);
      this.method = code['method'];
      this.email = code['email'];
    }
    
    await this.sendCode()
   
  }

   timer(){
    const twoMinutes = 2 * 60;
    const timer$ = timer(0, 1000).pipe(
      map((tick) => twoMinutes - tick), 
      takeWhile((remaining) => remaining >= 0) 
    );

    
    this.countdown = timer$.pipe(
      map((remaining) => {
        const minutes = Math.floor(remaining / 60);
        const seconds = remaining % 60;
        return `${this.pad(minutes)}:${this.pad(seconds)}`;
      })
    );
   }
   pad(val: number): string {
    return val < 10 ? `0${val}` : `${val}`;
  }


  status : string = "";

  formRequest: FormGroup = new FormGroup({
    code: new FormControl('', [ Validators.required ])
  });

 
  sendVerificationCode(email: string): void {
    if(this.method == "sms")
      {
        this.authService.sendVerificationCode(email).subscribe(
          (response : any) => {
    
          },
          (error) => {
          }
        );

      }
    if(this.method == "mail")
      {
        this.authService.sendVerificationCodeMail(email).subscribe(
          (response : any) => {
    
          },
          (error) => {
          }
        );

      }
    
  }

  async sendCode()
  {
    this.timer()
    this.sendVerificationCode(this.email)
   
  }
  resend(){
    this.sendCode()
  }

  verify()
  {
    if(this.formRequest.valid){
    this.authService.verifyCode(this.formRequest.value.code.toString(),this.email).subscribe({
      next : (response) => {
        this.authResponse = response;
        localStorage.setItem('token', response.access_token as string);
        this.userService.getUser(this.email).subscribe({
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
            this.router.navigate(['/home']);
          },
          error: (err: any) => {
          },
        });

      },
      error: (error) => {
        this.errorMessage = 'Invalid code';
      }

    })
    }
   
  }

  isValidCode(): boolean {
    const codeValue = this.formRequest.value.code;
    return codeValue && codeValue.toString().length === 6;
}

}
