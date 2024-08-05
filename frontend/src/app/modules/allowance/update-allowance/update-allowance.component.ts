import { Component, Input, OnInit } from '@angular/core';
import { Allowance } from '../../../core/models/allowance';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AllowanceService } from '../../../core/services/allowance.service';

@Component({
  selector: 'app-update-allowance',
  templateUrl: './update-allowance.component.html',
  styleUrl: './update-allowance.component.css',
})
export class UpdateAllowanceComponent implements OnInit {
  @Input() allowance!: Allowance;

  allowancedata!: Allowance;
  updateForm!: FormGroup;
  constructor(
    private formB: FormBuilder,
    private allowanceService: AllowanceService
  ) {}

  ngOnInit() {
    if (this.allowance == null) {
      return;
    }

    console.log(this.allowance);
    let data = this.allowance;

    this.updateForm = this.formB.group({
      ammountAllowance: [data.amount],
      descriptionAllowance: [data.description],
      categoryAllowance: [data.category],
    });
    this.updateForm.patchValue(data);
  }

  async updateAllowance() {
    this.allowance.description = this.updateForm.value.descriptionAllowance;
    this.allowance.amount = this.updateForm.value.ammountAllowance;
    this.allowance.category = this.updateForm.value.categoryAllowance;
    this.allowance.date = new Date().toISOString().toString();

    this.allowanceService
      .updateAllowance(this.allowance.id, this.allowance)
      .subscribe(
        async (response) => {
          alert('Updated Successfully!');
          console.log('allowance',this.allowance)
        },
        (error) => {
          console.error('Update failed:', error);
        }
      );
  }
}
