import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { AuthCardComponent } from '../../ui/auth-card/auth-card.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../data-access/auth.service';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { IAPIResponse } from '../../../shared/services/api/types/api-response.type';
import { IUser } from '../../../shared/utils/types/models.type';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  imports: [
    RouterLink,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    NgOptimizedImage,
    CommonModule,
    AuthCardComponent,
  ],
})
export class AuthSignInComponent {
  #formBuilder: FormBuilder = inject(FormBuilder);
  #authService = inject(AuthService);
  #route = inject(ActivatedRoute);
  redirectUrl = signal<string>(this.#route.snapshot.queryParams['redirectUrl'] || '/');
  signInForm: FormGroup;
  signIn$: Observable<IAPIResponse<IUser>> | undefined;

  constructor() {
    this.signInForm = this.#formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSignIn(): void {
    if (this.signInForm.invalid) return;
    this.signInForm.disable();
    this.signIn$ = this.#authService.signIn(this.signInForm.value, this.redirectUrl());
    this.signInForm.enable();
  }

  signinWithGoogle(): void {
    window.location.replace(environment.apiUrl + 'auth/sign-in');
  }
}
