import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Config } from '../../../core/models/config';
import { ConfigService } from '../../../core/services/config.service';

@Component({
  selector: 'app-update-config',
  templateUrl: './update-config.component.html',
  styleUrls: ['./update-config.component.css'],
})
export class UpdateConfigComponent implements OnInit {
  @Input() config!: Config;

  updateForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private configService: ConfigService
  ) {}

  ngOnInit(): void {
    if (!this.config) {
      return;
    }

    this.updateForm = this.formBuilder.group({
      companyName: [this.config.companyName],
      address: [this.config.address],
      payDay: [this.config.payDay],
      delayBeforePayment: [this.config.delayBeforePayment],
      cnssAffiliation: [this.config.cnssAffiliation],
      cnssRate: [this.config.cnssrate],
      cssRate: [this.config.cssrate],
    });
  }

  updateConfig(): void {
    const updatedConfig: Config = {
      id: this.config.id,
      companyName: this.updateForm.value.companyName,
      address: this.updateForm.value.address,
      payDay: this.updateForm.value.payDay,
      delayBeforePayment: this.updateForm.value.delayBeforePayment,
      cnssAffiliation: this.updateForm.value.cnssAffiliation,
      cnssrate: this.updateForm.value.cnssRate,
      cssrate: this.updateForm.value.cssRate,
      companyLogo: '',
    };

    this.configService.updateConfig(this.config.id, updatedConfig).subscribe(
      () => {
        alert('Config updated successfully!');
      },
      (error) => {
        console.error('Update failed:', error);
      }
    );
  }
}
