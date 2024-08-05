import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Holiday } from '../../../core/models/Holiday';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HolidayService } from '../../../core/services/holiday-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-holiday',
  templateUrl: './update-holiday.component.html',
  styleUrl: './update-holiday.component.css',
})
export class UpdateHolidayComponent implements OnInit {
  @Input() Id!: string | null;

  id!: string | null;
  holiday!: Holiday;
  updateForm!: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formB: FormBuilder,
    private holidayService: HolidayService
  ) {}
  ngOnInit() {
    if (this.Id == null) {
      return;
    }
    this.holidayService
      .getHolidayById(this.Id)
      .subscribe((data: Holiday | String) => {
        if ('name' in data) {
          console.log(data);

          this.holiday = data;
          this.updateForm = this.formB.group({
            name: [''],
            date: [''],
            duration: [''],
            shift: [''],
          });

          this.updateForm.patchValue(data);
        }
      }),
      (error: any) => {
        console.error('Error fetching user by ID:', error);
      };
  }

  updateholiday() {
    this.holiday.date = this.updateForm.value.date;
    this.holiday.duration = this.updateForm.value.duration;
    this.holiday.shift = this.updateForm.value.shift;
    this.holiday.name = this.updateForm.value.name;

    this.holidayService.updateHoliday(this.holiday.id, this.holiday).subscribe(
      (response) => {
        alert('User Updated Successfully!');
        this.holidayService.filter('register click')
      },
      (error) => {
        console.error('Update failed:', error);
      }
    );
  }
}
