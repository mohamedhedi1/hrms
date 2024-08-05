import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import * as faceapi from 'face-api.js';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  
  verifiedImageHumain = false
  NotVerifedHumain = false
  displayStatusImage =false
  user: any = {};
  @ViewChild('fileInput') fileInput!: ElementRef;
  uploadedImageUrl=""
  modelUrl="https://justadudewhohacks.github.io/face-api.js/models/ssd_mobilenetv1_model-weights_manifest.json"

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUserProfile();
  }

  async getUserProfile() {
    const userString = await localStorage.getItem('user');

    if (userString) {
      const user = JSON.parse(userString);
      const email = user['email'];

      this.userService.getUserByEmail(email).subscribe((userData: any) => {
      
        this.user = userData;
       
      });
    }
  }




async updateProfileImage() {
  await this.userService.uploadProfileImage(this.user.email, this.uploadedImageUrl).subscribe(
    () => {
      this.user.image=this.uploadedImageUrl
      this.uploadedImageUrl=""
      this.verifiedImageHumain = false
      this.NotVerifedHumain = false
      this.displayStatusImage =false
      
    },
    (error) => {
    }
  );
}



async onFileSelected(event: any) {
  const file: File = event.target.files[0];
  if (file) {
    
    const formData = new FormData();
    formData.append('image', file);
    this.userService.uploadImage(formData).subscribe(
      async (response: any) => {
        
        this.uploadedImageUrl = response.url;
        this.displayStatusImage=true

        // Perform face detection on the uploaded image
        await this.detectFaces(response.url);
        
      },
      (error) => {
      }
    );
  }
}

async detectFaces(imageUrl: string) {
 
  // Load face-api.js models
  await faceapi.nets.ssdMobilenetv1.loadFromUri(this.modelUrl);
 // await faceapi.nets.faceLandmark68Net.loadFromUri(this.modelUrl);
 // await faceapi.nets.faceRecognitionNet.loadFromUri(this.modelUrl);

  // Load image and perform face detection
  const img = await faceapi.fetchImage(imageUrl);
  const detections = await faceapi.detectAllFaces(img);
  this.displayStatusImage = false
  if (detections.length > 0) {
    // Do something if faces are detected
    this.verifiedImageHumain = true;
    this.NotVerifedHumain=false;
    

  } else {
    // Do something if no faces are detected
    this.NotVerifedHumain=true;
    this.verifiedImageHumain=false;
  }
}





}
