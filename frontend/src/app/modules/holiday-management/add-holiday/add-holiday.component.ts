import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Holiday } from '../../../core/models/Holiday';
import { HolidayService } from '../../../core/services/holiday-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-holiday',
  templateUrl: './add-holiday.component.html',
  styleUrl: './add-holiday.component.css',
})
export class AddHolidayComponent {
  constructor(private holidayService: HolidayService, private router: Router) {}

  add(form: NgForm) {
    if (form.valid) {
      const holiday: Holiday = {
        id: '',
        name: form.value.name,
        date: form.value.date,
        duration: form.value.duration,
        shift: form.value.shift,
      };
      this.holidayService.addHoliday(holiday).subscribe(
        () => {
          alert('Added Successfully!');
          this.holidayService.filter('register click')
          
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
}
