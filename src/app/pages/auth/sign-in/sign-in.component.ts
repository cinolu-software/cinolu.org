import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertComponent } from '@fuse/components/alert';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { environment } from 'environments/environment';
import { team } from 'app/pages/landing/utils/data/team';
import { AuthService } from '../auth.service';
import { TopbarComponent } from '../../../common/components/topbar/topbar.component';
import { AuthCardComponent } from '../slots/auth-card/auth-card.component';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  templateUrl: './sign-in.component.html',
  animations: fuseAnimations,
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
    CommonModule,
    TopbarComponent,
    AuthCardComponent
  ]
})
export class AuthSignInComponent {
  #formBuilder: FormBuilder = inject(FormBuilder);
  #authService = inject(AuthService);
  #token: string = inject(ActivatedRoute).snapshot.queryParams['token'];
  team = team;
  signInForm: FormGroup;
  signIn = this.#authService.signIn();
  verifyEmail = this.#authService.verifyEmail();

  constructor() {
    this.signInForm = this.#formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    if (this.#token) this.verifyEmail.mutate(this.#token);
  }

  onSignIn(): void {
    if (this.signInForm.invalid) return;
    this.signInForm.disable();
    this.signIn.mutate(this.signInForm.value);
    this.signInForm.enable();
  }

  signinWithGoogle(): void {
    window.location.replace(environment.apiUrl + 'auth/sign-in');
  }
}
