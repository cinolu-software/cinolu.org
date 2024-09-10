import { Component, inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertComponent } from '@fuse/components/alert';
import { Observable } from 'rxjs';
import { IForgotPasswordStore } from './types/forgot-password-store.interface';
import { TopbarComponent } from '../../../core/topbar/topbar.component';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { APIValiadationError } from 'app/core/pipes/api-validation-error.pipe';

@Component({
  selector: 'auth-forgot-password',
  templateUrl: './forgot-password.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
  standalone: true,
  imports: [
    FuseAlertComponent,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    RouterLink,
    TopbarComponent,
    CommonModule,
    NgOptimizedImage,
    APIValiadationError
  ]
})
export class AuthForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  state$: Observable<IForgotPasswordStore>;
  private _formBuilder: FormBuilder = inject(FormBuilder);

  constructor() {
    this.forgotPasswordForm = this._formBuilder.group({
      email: ['', [Validators.required]]
    });
  }

  sendResetToken(): void {
    if (!this.forgotPasswordForm.invalid) {
    }
  }
}
