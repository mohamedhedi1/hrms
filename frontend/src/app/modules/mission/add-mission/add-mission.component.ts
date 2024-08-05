import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MissionService } from '../../../core/services/mission.service';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-add-mission',
  templateUrl: './add-mission.component.html',
  styleUrl: './add-mission.component.css'
})
export class AddMissionComponent implements OnInit{
  myForm: FormGroup;
  availableUsers:  any[] = [];
  selectedUsers :  any[] = [];
  clientId : String =""

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private missionService : MissionService,
    
  ){
    
    this.myForm = this.fb.group({
      title: ['', [Validators.pattern('[A-Za-z]+'), Validators.required]],
      description: ['', [Validators.pattern('[A-Za-z]+'), Validators.required]],
      startDate :  [''],
      endDate : [''],
      status : [''],
      userId : [''],
      client : ['']
    })
  }
  async ngOnInit(): Promise<void> {

    const userProfileString =await  localStorage.getItem('user');
    if (userProfileString) {
      const userProfile = JSON.parse(userProfileString);
      const email = userProfile['email']
      this.missionService.getUserIdByEmail(email).subscribe(
        (res: any) => {
          this.clientId = res['id']
          console.log( this.clientId)
       
        },
        (error) => {
          console.error('Error fetching user ID by email:', error);
        }
      );
    
    }
   await  this.getAvailableUser()
    
  
  }




  getAvailableUser() {
    this.missionService.getAvailableUser().subscribe(
      (users: any) => {
        
        this.availableUsers = users.filter((user: { id: String; }) => user.id != this.clientId);
        
        console.log(this.availableUsers)
      },
      (error) => {
        console.error('Error fetching available users:', error);
      }
    );
  }


  onuserSelect(user: any, event: any): void {
    const isChecked = event.target.checked;
    if (isChecked) {
      this.selectedUsers.push(user);
    } else {
      this.selectedUsers = this.selectedUsers.filter(role => role.id !== user.id);
    }
  }

  onSubmit(){
    
    this.myForm.value.client = this.clientId
    const userIdList = this.selectedUsers.map((user) => user.id);
    this.myForm.value.userId = userIdList
    this.myForm.value.status = "PENDING"
    this.missionService.addMission(this.myForm.value).subscribe(
      (response) => {
        
          this.router.navigate(['/home/missions']);
     
      },
      (error) => {
      }
    );

   

  }



}
