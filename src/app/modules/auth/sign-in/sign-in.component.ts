import { Component, inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertComponent } from '@fuse/components/alert';
import { SignInStore } from './data-access/sign-in.store';
import { Observable } from 'rxjs';
import { ISignInStore } from './types/sign-in-store.interface';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { TopbarComponent } from '../../../core/topbar/topbar.component';
import { environment } from 'environments/environment';

@Component({
  selector: 'auth-sign-in',
  templateUrl: './sign-in.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
  standalone: true,
  providers: [SignInStore],
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
    CommonModule,
    NgOptimizedImage,
    TopbarComponent
  ]
})
export class AuthSignInComponent implements OnInit {
  signInForm: FormGroup;
  state$: Observable<ISignInStore>;
  private _signInStore = inject(SignInStore);
  private _formBuilder: FormBuilder = inject(FormBuilder);
  private _apiUrl = environment.apiUrl;

  ngOnInit(): void {
    this.signInForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    this.state$ = this._signInStore.state$;
  }

  signIn(): void {
    if (!this.signInForm.invalid) {
      this._signInStore.signIn(this.signInForm.value);
    }
  }

  signinWithGoogle(): void {
    window.location.replace(this._apiUrl + 'auth/google/redirect');
  }
}
