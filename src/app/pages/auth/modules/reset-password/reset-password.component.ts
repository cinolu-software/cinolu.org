import { Component, inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertComponent } from '@fuse/components/alert';
import { Observable, Subscription } from 'rxjs';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { team } from 'app/pages/landing/data/team';
import { AuthService } from 'app/pages/auth/auth.service';
import { ResetPasswordStore } from './reset-password.store';
import { IResetPasswordStore } from './types/reset-password-store.type';

@Component({
  selector: 'auth-reset-password',
  templateUrl: './reset-password.component.html',
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
export class AuthResetPasswordComponent {
  resetPasswordForm: FormGroup;
  team = team;
  state$: Observable<IResetPasswordStore>;
  private _token = inject(ActivatedRoute).snapshot.queryParams['token'];
  private _formBuilder = inject(FormBuilder);
  private _store = inject(ResetPasswordStore);

  constructor() {
    this.resetPasswordForm = this._formBuilder.group({
      password: ['', Validators.required],
      password_confirm: ['', Validators.required]
    });
    this.state$ = this._store.state$;
  }

  resetPassword(): void {
    if (this.resetPasswordForm.invalid) return;
    this.resetPasswordForm.disable();
    const { password, password_confirm } = this.resetPasswordForm.value;
    const payload = { token: this._token, password, password_confirm };
    this._store.resetPassword(payload);
    this.resetPasswordForm.enable();
  }
}
