import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { AuthCardComponent } from '../../ui/auth-card/auth-card.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { environment } from '../../../../environments/environment';
import { SignInStore } from '../../data-access/sign-in.store';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  providers: [SignInStore],
  imports: [
    RouterLink,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    NgOptimizedImage,
    CommonModule,
    AuthCardComponent
  ]
})
export class AuthSignInComponent {
  #formBuilder: FormBuilder = inject(FormBuilder);
  #route = inject(ActivatedRoute);
  redirectUrl = signal<string>(this.#route.snapshot.queryParams['redirectUrl'] || '/');
  form: FormGroup;
  store = inject(SignInStore);

  constructor() {
    this.form = this.#formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSignIn(): void {
    if (this.form.invalid) return;
    this.form.disable();
    this.store.signIn({
      payload: this.form.value,
      redirectUrl: this.redirectUrl()
    });
    this.form.enable();
  }

  signinWithGoogle(): void {
    window.location.replace(environment.apiUrl + 'auth/sign-in');
  }
}
