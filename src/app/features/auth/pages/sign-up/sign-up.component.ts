import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { environment } from '../../../../../environments/environment';
import { AuthCardComponent } from '../../components/auth-card/auth-card.component';
import { SignUpStore } from '../../store/sign-up.store';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ArrowLeft, ArrowRight, LucideAngularModule } from 'lucide-angular';
import { SelectModule } from 'primeng/select';
import { StepperModule } from 'primeng/stepper';
import { TextareaModule } from 'primeng/textarea';
import { DatePickerModule } from 'primeng/datepicker';
import { COUNTRY_CODE } from '../../../../shared/data/country-item.data';
import { GENDERS } from '../../../join-us/data/member.items';
import { SignUpRolesStore } from '../../store/sign-up-roles.store';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  providers: [SignUpStore, SignUpRolesStore],
  imports: [
    InputTextModule,
    PasswordModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthCardComponent,
    LucideAngularModule,
    InputTextModule,
    FormsModule,
    FloatLabelModule,
    PasswordModule,
    SelectModule,
    StepperModule,
    DatePickerModule,
    TextareaModule,
    CommonModule,
    ReactiveFormsModule
  ]
})
export class AuthSignUpComponent {
  #formBuilder: FormBuilder = inject(FormBuilder);
  form: FormGroup;
  store = inject(SignUpStore);
  rolesStore = inject(SignUpRolesStore);
  icons = { next: ArrowRight, previous: ArrowLeft };
  genderItems = GENDERS;
  countryItems = COUNTRY_CODE;

  constructor() {
    this.form = this.#formBuilder.group({
      name: ['', [Validators.minLength(5)]],
      email: ['', [Validators.email, Validators.required]],
      phone_number: ['', [Validators.required, Validators.pattern(/^\+?[1-9]\d{1,14}$/)]],
      gender: ['', [Validators.required]],
      birth_date: ['', [Validators.required]],
      roles: ['', [Validators.required]],
      country: ['', [Validators.required]],
      city: ['', [Validators.required]],
      address: ['', [Validators.required, Validators.minLength(3)]],
      reason: ['', [Validators.required]],
      biography: ['', [Validators.required]]
    });
  }

  onSignUp(): void {
    if (this.form.invalid) return;
    const rawForm = this.form.value;
    const formattedForm = {
      ...rawForm,
      birth_date: new Date(rawForm.birth_date)
    };
    this.store.signUp(formattedForm);
  }

  signinWithGoogle(): void {
    window.location.replace(environment.apiUrl + 'auth/sign-in');
  }
}
