import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetpasswordService } from '../../core/services/resetpassword.service';


@Component({
  selector: 'app-newpassword',
  templateUrl: './newpassword.component.html',
  styleUrls: ['./newpassword.component.css']
})


export class NewpasswordComponent implements OnInit {
  status : string | undefined  ;
  token!: any;

  formRequest: FormGroup = new FormGroup({
    password: new FormControl('', [ Validators.required,  ]),
    confirmPassword: new FormControl('', [
      Validators.required,
     
    ])
  });
  

 constructor(private router: Router,
    private route: ActivatedRoute,
    private resetpasswordService: ResetpasswordService)
  {} 

  ngOnInit(): void {
   this.token = this.route.snapshot.queryParamMap.get('token');
  }


  resetpassword()
  {
    if(this.formRequest.valid && this.token && this.formRequest.value.password === this.formRequest.value.confirmPassword){
      this.resetpasswordService.reset(this.token,this.formRequest.value.password).subscribe({
        next : (response : any) => 
        {
          
         // if(response.status==="Password reset successfully!")
              this.router.navigate(['/login']);
            
           /* else{
              this.status= response.status;
            }*/
        }
      })
    }
    else 
    {this.status="Verify passwords!"}

  }


}
