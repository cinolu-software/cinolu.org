import { Component, inject, input, OnInit } from '@angular/core';
import { IUser } from '../../../../shared/utils/types/models.type';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-update-info',
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './update-info.component.html'
})
export class UpdateInfoComponent implements OnInit {
  user = input.required<IUser>();
  form: FormGroup;
  #fb = inject(FormBuilder);

  constructor() {
    this.form = this.#fb.group({
      info: this.#fb.group({
        name: ['', Validators.required],
        email: ['', Validators.required],
        address: [''],
        phone_number: ['']
      }),
      details: this.#fb.group({
        bio: [''],
        instagram: [''],
        linkedin: [''],
        facebook: ['']
      })
    });
  }

  ngOnInit(): void {
    this.form.patchValue({
      info: {
        name: this.user()?.name,
        email: this.user()?.email,
        address: this.user()?.address,
        phone_number: this.user()?.phone_number
      }
    });
  }

  updateInfo(): void {
    console.log(this.form.value);
  }
}
