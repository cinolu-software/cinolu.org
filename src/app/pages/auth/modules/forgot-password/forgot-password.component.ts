import { Component, inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertComponent } from '@fuse/components/alert';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { team } from 'app/pages/landing/data/team';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { ForgotPasswordStore } from './forgot-password.store';
import { IForgotPasswordStore } from './types/forgot-password-store.type';

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
    MatIconModule,
    MatProgressSpinnerModule,
    RouterLink,
    CommonModule,
    NgOptimizedImage
  ]
})
export class AuthForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  state$: Observable<IForgotPasswordStore>;
  team = team;
  private _formBuilder = inject(FormBuilder);
  private _store = inject(ForgotPasswordStore);

  constructor() {
    this.forgotPasswordForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
    this.state$ = this._store.state$;
  }

  submitForgotPassword(): void {
    if (!this.forgotPasswordForm.invalid) {
      this._store.forgotPassword(this.forgotPasswordForm.value);
    }
  }
}
