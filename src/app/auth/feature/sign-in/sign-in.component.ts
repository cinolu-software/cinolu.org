import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Animations } from 'app/shared/utils/animations';
import { AlertComponent } from 'app/shared/ui/alert/alert.component';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { environment } from 'environments/environment';
import { AuthService } from 'app/auth/data-access/auth.service';
import { AuthCardComponent } from '../../ui/auth-card/auth-card.component';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IAPIResponse } from 'app/shared/services/api/types/api-response.type';
import { IUser } from 'app/shared/utils/types/models.type';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  animations: Animations,
  imports: [
    RouterLink,
    AlertComponent,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    NgOptimizedImage,
    CommonModule,
    AuthCardComponent
  ]
})
export class AuthSignInComponent {
  #formBuilder: FormBuilder = inject(FormBuilder);
  #authService = inject(AuthService);
  #token: string = inject(ActivatedRoute).snapshot.queryParams['token'];
  signInForm: FormGroup;
  result$: Observable<IAPIResponse<IUser>>;
  verifyEmail$: Observable<IAPIResponse<IUser>>;

  constructor() {
    this.signInForm = this.#formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    if (this.#token) this.verifyEmail$ = this.#authService.verifyEmail(this.#token);
  }

  onSignIn(): void {
    if (this.signInForm.invalid) return;
    this.signInForm.disable();
    this.result$ = this.#authService.signIn(this.signInForm.value);
    this.signInForm.enable();
  }

  signinWithGoogle(): void {
    window.location.replace(environment.apiUrl + 'auth/sign-in');
  }
}
