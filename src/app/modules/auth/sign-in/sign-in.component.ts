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
    MatCheckboxModule,
    MatProgressSpinnerModule,
    CommonModule,
    NgOptimizedImage
  ]
})
export class AuthSignInComponent implements OnInit {
  signInForm: FormGroup;
  vm$: Observable<ISignInStore>;
  imgs: string[] = ['/images/team/ls.webp', '/images/team/mm.webp', '/images/team/jm.webp', '/images/team/bn.webp'];
  private _signInStore = inject(SignInStore);
  private _formBuilder: FormBuilder = inject(FormBuilder);

  ngOnInit(): void {
    this.signInForm = this._formBuilder.group({
      email: ['admin@admin.com', [Validators.required, Validators.email]],
      password: ['admin', Validators.required]
    });
    this.vm$ = this._signInStore.vm$;
  }

  signIn(): void {
    if (!this.signInForm.invalid) {
      this._signInStore.signIn(this.signInForm.value);
    }
  }
}
