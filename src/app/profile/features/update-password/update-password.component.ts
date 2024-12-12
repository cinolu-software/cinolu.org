import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ProfileService } from '../../data-access/profile.service';
import { Observable } from 'rxjs';
import { IAPIResponse } from '../../../shared/services/api/types/api-response.type';
import { IUser } from '../../../shared/utils/types/models.type';
import { Animations } from '../../../shared/utils/animations';
import { AlertComponent } from '../../../shared/ui/alert/alert.component';

@Component({
  selector: 'app-update-password',
  providers: [ProfileService],
  animations: Animations,
  imports: [
    CommonModule,
    AlertComponent,
    MatProgressSpinnerModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './update-password.component.html'
})
export class UpdatePasswordComponent {
  form: FormGroup;
  #fb = inject(FormBuilder);
  update$: Observable<IAPIResponse<IUser>>;
  #profileService = inject(ProfileService);

  constructor() {
    this.form = this.#fb.nonNullable.group({
      password: ['', Validators.required],
      password_confirm: ['', Validators.required]
    });
  }

  updatePassword(): void {
    this.update$ = this.#profileService.updatePassword(this.form.value);
  }
}
