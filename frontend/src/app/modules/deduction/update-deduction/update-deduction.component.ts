import { Component, Input, OnInit } from '@angular/core';
import { Deduction } from '../../../core/models/deduction';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DeductionService } from '../../../core/services/deduction.service';

@Component({
  selector: 'app-update-deduction',
  templateUrl: './update-deduction.component.html',
  styleUrl: './update-deduction.component.css',
})
export class UpdateDeductionComponent implements OnInit {
  @Input() deduction!: Deduction;

  deductiondata!: Deduction;
  updateForm!: FormGroup;
  constructor(
    private formB: FormBuilder,
    private deductionService: DeductionService
  ) {}

  ngOnInit() {
    if (this.deduction == null) {
      return;
    }
    let data = this.deduction;

    this.updateForm = this.formB.group({
      ammountDeduction: [data.amount],
      descriptionDeduction: [data.description],
    });
    this.updateForm.patchValue(data);
  }

  async updateDeduction() {
    this.deduction.description = this.updateForm.value.descriptionDeduction;
    this.deduction.amount = this.updateForm.value.ammountDeduction;
    this.deduction.date = new Date().toISOString().toString();

    this.deductionService
      .updateDeduction(this.deduction.id, this.deduction)
      .subscribe(
        async (response) => {
          alert('Updated Successfully!');
        },
        (error) => {
          console.error('Update failed:', error);
        }
      );
  }
}
