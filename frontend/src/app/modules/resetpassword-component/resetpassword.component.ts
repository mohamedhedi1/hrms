import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResetpasswordService } from '../../core/services/resetpassword.service';
@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent {
  status : string = "";

  formRequest: FormGroup = new FormGroup({
    email: new FormControl('', [ Validators.required ])
  });

  constructor(private router: Router,
    private resetpasswordService: ResetpasswordService)
  {}

  sendmail()
  {
    if(this.formRequest.valid){
      this.resetpasswordService.request(this.formRequest.value.email).subscribe(
        {
          next : (response: any) => {
            this.router.navigate(['/emailsended']);
          }
        }
      )
    }
    this.router.navigate(['/emailsended']);
  }
}