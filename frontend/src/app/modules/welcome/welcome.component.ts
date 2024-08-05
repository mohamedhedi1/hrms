import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ResumeAssistantService } from '../../core/services/resume-assistant.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent implements OnInit{
  thread :string = ""
  messages : string[] = []
  myForm: FormGroup;

  constructor( private fb: FormBuilder ,private resumeAssistantService : ResumeAssistantService, private router: Router){
    this.myForm = this.fb.group({
      msg: ''})
  }
 

  async ngOnInit() {
    
      this.resumeAssistantService.getThread().subscribe({
        next: (rs: any) => {
       
          this.thread=rs.thread
          
        },
        error: (error) => {
         
        }
      });
    
  }
  
  

    sendMessage(){
      
    const body = {message : this.myForm.value.msg}
    this.messages.push(this.myForm.value.msg)
    this.myForm = this.fb.group({
      msg: ''})
    this.resumeAssistantService.sendMessage(body, this.thread).subscribe({
      next: (rs: any) => {
        this.messages.push(rs.msg)
        
      },
      error: (error) => {
      }
    });

  }
 
    
}
