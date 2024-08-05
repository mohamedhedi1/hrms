import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Config } from '../../../core/models/config';
import { ConfigService } from '../../../core/services/config.service';

@Component({
  selector: 'app-list-config',
  templateUrl: './list-config.component.html',
  styleUrl: './list-config.component.css',
})
export class ListConfigComponent implements OnInit {
  data: Config[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formB: FormBuilder,
    private configService: ConfigService
  ) {}

  ngOnInit() {
    this.configService.getConfig().subscribe((data) => {
      console.log(data);
      this.data = data;
    }),
      (error: any) => {
        console.error('Error fetching user by ID:', error);
      };
    this.configService.getConfig().subscribe((data) => {
      this.totalAnnouncements = data.length;
    });
  }
  deleteAnnCarpooling(id: number) {
    this.configService.deleteConfig(id).subscribe((response) => {
      alert(' Announcement deleted Successfully!');

      this.ngOnInit();
    });
  }
  totalAnnouncements!: number;
}
