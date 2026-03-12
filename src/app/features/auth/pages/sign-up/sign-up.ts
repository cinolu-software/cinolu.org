import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthCard } from '../../components/auth-card/auth-card';
import { SignUpStore } from '../../store/sign-up.store';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { COUNTRY_CODE } from '../../../../shared/data/country-item.data';
import { GENDERS } from '../../../../shared/data/genders.data';
import {
  LucideAngularModule,
  User,
  Mail,
  Calendar,
  Users,
  Globe,
  Phone,
  Lock,
  AlertCircle,
  ArrowRight,
  Loader2,
  Eye,
  EyeOff
} from 'lucide-angular';
import { TranslateModule } from '@ngx-translate/core';
import { FormManager, StepConfig } from '@shared/components/form-manager/form-manager';
import { ButtonComponent, SelectComponent, type UiSelectOption } from '@shared/ui';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.html',
  providers: [SignUpStore],
  imports: [
    ButtonComponent,
    FormsModule,
    RouterLink,
    ReactiveFormsModule,
    AuthCard,
    CommonModule,
    SelectComponent,
    FormManager,
    LucideAngularModule,
    TranslateModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUp {
  #formBuilder: FormBuilder = inject(FormBuilder);
  #route = inject(ActivatedRoute);
  form: FormGroup;
  store = inject(SignUpStore);
  genderItems = GENDERS;
  countryItems = COUNTRY_CODE;
  countryOptions: UiSelectOption[] = COUNTRY_CODE.map((item) => ({ label: item.name, value: item.name }));
  genderOptions: UiSelectOption[] = GENDERS.map((item) => ({ label: item.label, value: item.value }));
  selectedCountryCode = '';
  ref = this.#route.snapshot.queryParams['ref'] || null;
  showPassword = signal(false);
  showPasswordConfirm = signal(false);

  // Configuration stepper : 3 étapes logiques
  stepConfig: StepConfig[] = [
    { label: 'Identité', controls: ['name', 'email'] },
    { label: 'Coordonnées', controls: ['phone_number', 'country', 'gender', 'birth_date'] },
    { label: 'Sécurité', controls: ['password', 'password_confirm'] }
  ];

  icons = {
    user: User,
    mail: Mail,
    calendar: Calendar,
    users: Users,
    globe: Globe,
    phone: Phone,
    lock: Lock,
    alertCircle: AlertCircle,
    arrowRight: ArrowRight,
    loader: Loader2,
    eye: Eye,
    eyeOff: EyeOff
  };

  constructor() {
    this.form = this.#formBuilder.group(
      {
        name: ['', [Validators.required, Validators.minLength(5)]],
        email: ['', [Validators.email, Validators.required]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        password_confirm: ['', [Validators.required, Validators.minLength(6)]],
        phone_number: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
        gender: ['', [Validators.required]],
        birth_date: ['', [Validators.required]],
        country: ['', [Validators.required]]
      },
      {
        validators: this.passwordMatchValidator
      }
    );
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const passwordConfirm = control.get('password_confirm');

    if (!password || !passwordConfirm) {
      return null;
    }

    if (!passwordConfirm.touched) {
      return null;
    }

    if (password.value !== passwordConfirm.value) {
      passwordConfirm.setErrors({ ...passwordConfirm.errors, passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      if (passwordConfirm.hasError('passwordMismatch')) {
        const errors = { ...passwordConfirm.errors };
        delete errors['passwordMismatch'];
        passwordConfirm.setErrors(Object.keys(errors).length > 0 ? errors : null);
      }
    }

    return null;
  }

  onSignUp(): void {
    if (this.form.invalid) return;
    this.store.signUp({
      ...this.form.value,
      referral_code: this.ref,
      phone_number: this.selectedCountryCode + this.form.value.phone_number,
      birth_date: new Date(this.form.value.birth_date)
    });
  }

  onSelectCountry(value: string | string[] | null): void {
    if (Array.isArray(value)) return;
    this.selectedCountryCode = this.countryItems.find((item) => item.name === value)?.code || '';
  }

  get formattedCountryCode(): string {
    if (!this.selectedCountryCode) return '---';
    return this.selectedCountryCode.toString().startsWith('+')
      ? this.selectedCountryCode
      : `+${this.selectedCountryCode}`;
  }

  togglePasswordVisibility(field: 'password' | 'passwordConfirm'): void {
    if (field === 'password') {
      this.showPassword.update((value) => !value);
      return;
    }

    this.showPasswordConfirm.update((value) => !value);
  }
}
