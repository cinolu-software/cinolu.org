import { Component, inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertComponent } from '@fuse/components/alert';
import { ResetPasswordStore } from './data-access/reset-password.store';
import { IResetPasswordStore } from './types/reset-password-store.interface';
import { Observable } from 'rxjs';
import { TopbarComponent } from '../../../core/topbar/topbar.component';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ValiadationInputError } from '../../../core/pipes/api-input-error.pipe';

@Component({
  selector: 'auth-reset-password',
  templateUrl: './reset-password.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
  standalone: true,
  providers: [ResetPasswordStore],
  imports: [
    FuseAlertComponent,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    RouterLink,
    TopbarComponent,
    CommonModule,
    ValiadationInputError,
    NgOptimizedImage
  ]
})
export class AuthResetPasswordComponent {
  resetPasswordForm: FormGroup;
  state$: Observable<IResetPasswordStore>;
  private _formBuilder = inject(FormBuilder);
  private _resetPasswordStore = inject(ResetPasswordStore);

  constructor() {
    this.resetPasswordForm = this._formBuilder.group({
      token: ['', Validators.required],
      password: ['', Validators.required],
      password_confirm: ['', Validators.required]
    });
    this.state$ = this._resetPasswordStore.state$;
  }

  resetPassword(): void {
    if (!this.resetPasswordForm.invalid) this._resetPasswordStore.resetPassword(this.resetPasswordForm.value);
  }
}
