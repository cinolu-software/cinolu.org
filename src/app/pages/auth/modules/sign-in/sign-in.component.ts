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
import { team } from 'app/pages/landing/data/team';
import { SignInStore } from './sign-in.store';
import { Observable } from 'rxjs';
import { ISigninStore } from './types/sing-in-store.type';

@Component({
  selector: 'auth-sign-in',
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
    CommonModule
  ]
})
export class AuthSignInComponent {
  signInForm: FormGroup;
  team = team;
  state$: Observable<ISigninStore>;
  private _formBuilder: FormBuilder = inject(FormBuilder);
  private _store = inject(SignInStore);
  private _token: string = inject(ActivatedRoute).snapshot.queryParams['token'];

  constructor() {
    this.signInForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    if (this._token) this._store.verifyEmail(this._token);
    this.state$ = this._store.state$;
  }

  signIn(): void {
    if (this.signInForm.invalid) return;
    this._store.signIn(this.signInForm.value);
  }

  signinWithGoogle(): void {
    window.location.replace(environment.apiUrl + 'auth/sign-in');
  }
}
