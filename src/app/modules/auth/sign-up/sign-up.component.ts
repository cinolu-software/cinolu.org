import { Component, inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterLink } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertComponent } from '@fuse/components/alert';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { TopbarComponent } from '../../../core/topbar/topbar.component';
import { environment } from 'environments/environment';
import { Subscription } from 'rxjs';
import { AuthService } from 'app/core/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { team } from 'app/modules/landing/data/team';

@Component({
  selector: 'auth-sign-up',
  templateUrl: './sign-up.component.html',
  encapsulation: ViewEncapsulation.None,
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
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatStepperModule,
    TopbarComponent,
    NgOptimizedImage
  ]
})
export class AuthSignUpComponent implements OnInit, OnDestroy {
  signUpForm: FormGroup;
  isLoading = false;
  error: string | null = null;
  team = team;
  private _formBuilder = inject(FormBuilder);
  private _authService = inject(AuthService);
  private _router = inject(Router);
  private _subscription: Subscription | null = null;

  private resetState(): void {
    this.error = null;
    this.isLoading = false;
    this.signUpForm.enable();
  }

  private enableLoading(): void {
    this.isLoading = true;
    this.signUpForm.disable();
  }

  ngOnInit(): void {
    this.signUpForm = this._formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      phone_number: ['', Validators.required],
      password: ['', Validators.required],
      password_confirm: ['', [Validators.required]]
    });
  }

  signUp(): void {
    if (this.signUpForm.invalid) return;
    this.enableLoading();
    this._subscription = this._authService.signUp(this.signUpForm.value).subscribe({
      next: () => {
        this.resetState();
        this._router.navigate(['/sign-in']);
      },
      error: (error: HttpErrorResponse) => {
        this.resetState();
        this.error = error.error.message;
        this.signUpForm.enable();
      }
    });
  }

  signinWithGoogle(): void {
    window.location.replace(environment.apiUrl + 'auth/google/redirect');
  }

  ngOnDestroy(): void {
    if (this._subscription) this._subscription.unsubscribe();
  }
}
