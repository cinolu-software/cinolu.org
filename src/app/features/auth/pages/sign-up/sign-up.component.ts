import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { environment } from '../../../../../environments/environment';
import { AuthCardComponent } from '../../components/auth-card/auth-card.component';
import { SignUpStore } from '../../store/sign-up.store';
import { FloatLabel, FloatLabelModule } from 'primeng/floatlabel';
import { ArrowLeft, ArrowRight, LucideAngularModule } from 'lucide-angular';
import { SelectModule } from 'primeng/select';
import { StepperModule } from 'primeng/stepper';
import { TextareaModule } from 'primeng/textarea';
import { DatePickerModule } from 'primeng/datepicker';
import { COUNTRY_CODE } from '../../../../shared/data/country-item.data';
import { GENDERS, MEMBER_ITEMS } from '../../../join-us/data/member.items';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  providers: [SignUpStore],
  imports: [
    InputTextModule,
    PasswordModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AuthCardComponent,
    FloatLabel,

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

  constructor() {
    this.form = this.#formBuilder.group({
      fullname: ['', [Validators.minLength(5)]],
      email: ['', [Validators.email, Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?[1-9]\d{1,14}$/)]],
      gender: ['', [Validators.required]],
      birthdate: ['', [Validators.required]],
      statut: ['', [Validators.required]],
      countryCode: ['', [Validators.required]],
      adress: ['', [Validators.required, Validators.minLength(3)]],
      reason: ['', [Validators.required]]
    });
  }

  memberItems = MEMBER_ITEMS;
  icons = { next: ArrowRight, previous: ArrowLeft };

  genderItems = GENDERS;
  selectedGender = this.genderItems;
  countryItem = COUNTRY_CODE;

  statutItem = [
    { id: 1, name: 'Étudiant·e' },
    { id: 2, name: 'Entrepreneur·e' },
    { id: 3, name: 'Volontaire' },
    { id: 4, name: 'Chercheur·se' },
    { id: 5, name: 'Autre' }
  ];

  date: Date | undefined;

  selectedUserId = 0;

  selectUserType(type: number) {
    this.selectedUserId = type;
  }

  onSignUp(): void {
    if (this.form.invalid) {
      return;
    } else {
      console.log(this.form.value);
    }
    // this.store.signUp(this.form.value);
  }

  signinWithGoogle(): void {
    window.location.replace(environment.apiUrl + 'auth/sign-in');
  }
}
