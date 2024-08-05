import { Component, OnInit } from '@angular/core';
import { HolidayService } from '../../../core/services/holiday-service';
import { Holiday } from '../../../core/models/Holiday';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-list-holiday',
  templateUrl: './list-holiday.component.html',
  styleUrl: './list-holiday.component.css',
})
export class ListHolidayComponent implements OnInit {
  onDelete(id: string) {
    this.holidayService.deleteHoliday(id).subscribe((next) => {
      this.ngOnInit();
    });
  }
  navigateToUpdate(id: string) {
    console.log(id);
    this.router.navigateByUrl('home/holiday/Update/' + id);
  }
  constructor(
    private holidayService: HolidayService,
    private route: ActivatedRoute,
    private router: Router
  ) {

    this.holidayService.listen().subscribe((m: any) => {
      console.log(m);
      this.ngOnInit()
    });
  }

  navigatetoAdd() {
    this.router.navigateByUrl('home/holiday/add');
  }
  holidays: Holiday[] = [];
  ngOnInit(): void {
    this.holidayService.getAll().subscribe((data) => {
      console.log(data), (this.holidays = data);
    });
  }
}
