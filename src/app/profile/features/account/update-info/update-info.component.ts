import { Component, inject, input, OnInit } from '@angular/core';
import { IUser } from '../../../../shared/utils/types/models.type';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ProfileService } from '../../../data-access/profile.service';
import { Observable } from 'rxjs/internal/Observable';
import { IAPIResponse } from '../../../../shared/services/api/types/api-response.type';
import { Animations } from '../../../../shared/utils/animations';
import { AlertComponent } from '../../../../shared/ui/alert/alert.component';

@Component({
  selector: 'app-update-info',
  providers: [ProfileService],
  animations: Animations,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    AlertComponent
  ],
  templateUrl: './update-info.component.html'
})
export class UpdateInfoComponent implements OnInit {
  user = input.required<IUser>();
  form: FormGroup;
  update$: Observable<[IAPIResponse<IUser>, IAPIResponse<IUser>]>;
  #fb = inject(FormBuilder);
  #profileService = inject(ProfileService);

  constructor() {
    this.form = this.#fb.group({
      info: this.#fb.group({
        name: ['', Validators.required],
        email: ['', Validators.required],
        address: ['', Validators.required],
        phone_number: ['', Validators.required]
      }),
      details: this.#fb.group({
        bio: ['', Validators.required],
        linkedin: ['', Validators.pattern(/^(https?:\/\/)?((www|\w\w)\.)?linkedin\.com\/.*$/i)],
        facebook: ['', Validators.pattern(/^(https?:\/\/)?((www|\w\w)\.)?facebook\.com\/.*$/i)]
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
      },
      details: {
        bio: this.user()?.detail?.bio,
        linkedin: this.user()?.detail?.socials?.LinkedIn,
        facebook: this.user()?.detail?.socials?.Facebook
      }
    });
  }

  updateInfo(): void {
    const { info, details } = this.form.value;
    const detailsPayload = {
      bio: details.bio,
      socials: { LinkedIn: details.linkedin, Facebook: details.facebook } as unknown as JSON
    };
    this.update$ = combineLatest([
      this.#profileService.updateProfile(info),
      this.#profileService.addDetails(detailsPayload)
    ]);
  }
}
