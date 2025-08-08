import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { environment } from '../../../../../../environments/environment';
import { AuthCardComponent } from '../../components/auth-card/auth-card.component';
import { SignUpStore } from '../../store/sign-up.store';
import { FloatLabelModule } from 'primeng/floatlabel';
import {
  Check,
  ChevronsLeft,
  ChevronsRight,
  LucideAngularModule,
} from 'lucide-angular';
import { StepperModule } from 'primeng/stepper';
import { TextareaModule } from 'primeng/textarea';
import { DatePickerModule } from 'primeng/datepicker';
import { SignUpRolesStore } from '../../store/sign-up-roles.store';
import { MultiSelect } from 'primeng/multiselect';
import { InputGroupModule } from 'primeng/inputgroup';
import { SelectChangeEvent, SelectModule } from 'primeng/select';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { RouterLink } from '@angular/router';
import { COUNTRY_CODE } from '../../../../../shared/data/country-item.data';
import { GENDERS } from '../../../../../shared/data/member.items';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  providers: [SignUpStore, SignUpRolesStore],
  imports: [
    InputTextModule,
    PasswordModule,
    ButtonModule,
    FormsModule,
    RouterLink,
    ReactiveFormsModule,
    AuthCardComponent,
    LucideAngularModule,
    InputTextModule,
    FormsModule,
    FloatLabelModule,
    PasswordModule,
    SelectModule,
    MultiSelect,
    StepperModule,
    DatePickerModule,
    TextareaModule,
    CommonModule,
    LucideAngularModule,
    InputGroupModule,
    InputGroupAddonModule,
    ReactiveFormsModule,
  ],
})
export class AuthSignUpComponent {
  #formBuilder: FormBuilder = inject(FormBuilder);
  form: FormGroup;
  store = inject(SignUpStore);
  rolesStore = inject(SignUpRolesStore);
  genderItems = GENDERS;
  countryItems = COUNTRY_CODE;
  selectedCountryCode = '';
  icons = { next: ChevronsRight, previous: ChevronsLeft, check: Check };

  constructor() {
    this.form = this.#formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirm: ['', [Validators.required, Validators.minLength(6)]],
      phone_number: [
        '',
        [Validators.required, Validators.pattern(/^\+?[1-9]\d{1,14}$/)],
      ],
      gender: ['', [Validators.required]],
      birth_date: ['', [Validators.required]],
      roles: ['', [Validators.required]],
      country: ['', [Validators.required]],
      city: ['', [Validators.required]],
      reason: ['', [Validators.required]],
      biography: ['', [Validators.required]],
    });
  }

  onSignUp(): void {
    if (this.form.invalid) return;
    this.store.signUp({
      ...this.form.value,
      phone_number: this.selectedCountryCode + this.form.value.phone_number,
      birth_date: new Date(this.form.value.birth_date),
    });
  }

  onSelectCountry(event: SelectChangeEvent): void {
    const value = event.value;
    this.selectedCountryCode =
      this.countryItems.find((item) => item.name === value)?.code || '';
  }

  signinWithGoogle(): void {
    window.location.replace(environment.apiUrl + 'auth/sign-in');
  }
}
