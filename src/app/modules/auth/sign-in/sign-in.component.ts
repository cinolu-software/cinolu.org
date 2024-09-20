import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertComponent } from '@fuse/components/alert';
import { NgOptimizedImage } from '@angular/common';
import { TopbarComponent } from '../../../core/components/topbar/topbar.component';
import { environment } from 'environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from 'app/core/auth/auth.service';
import { Subscription } from 'rxjs';
import { team } from 'app/modules/landing/data/team';

@Component({
  selector: 'auth-sign-in',
  templateUrl: './sign-in.component.html',
  animations: fuseAnimations,
  standalone: true,
  imports: [
    RouterLink,
    FuseAlertComponent,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    NgOptimizedImage,
    TopbarComponent
  ]
})
export class AuthSignInComponent implements OnDestroy {
  signInForm: FormGroup;
  isLoading = false;
  error = null;
  team = team;
  private _authService = inject(AuthService);
  private _formBuilder: FormBuilder = inject(FormBuilder);
  private _subscription: Subscription | null = null;
  private _route = inject(ActivatedRoute);
  private _router = inject(Router);
  private _token: string = this._route.snapshot.queryParams['token'];

  constructor() {
    this.signInForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    if (this._token) this.verifyEmail();
  }

  private verifyEmail() {
    this.signInForm.enable();
    this._subscription = this._authService.verifyEmail(this._token).subscribe({
      next: ({ access_token }) => {
        this._authService.storeToken(access_token);
        this._router.navigate(['/']);
      },
      error: (error: HttpErrorResponse) => {
        this.error = error.error.message;
        this.signInForm.enable();
      }
    });
  }

  signIn(): void {
    if (this.signInForm.invalid) return;
    this.isLoading = true;
    this.error = null;
    this.signInForm.disable();
    this._subscription = this._authService.signIn(this.signInForm.value).subscribe({
      next: ({ access_token }) => {
        this._authService.storeToken(access_token);
        this._router.navigate(['/']);
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false;
        this.error = error.error.message;
        this.signInForm.enable();
      }
    });
  }

  signinWithGoogle(): void {
    window.location.replace(environment.apiUrl + 'auth/sign-in');
  }

  ngOnDestroy(): void {
    if (this._subscription) this._subscription.unsubscribe();
  }
}
