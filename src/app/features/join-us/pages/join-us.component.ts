import { Component, inject } from '@angular/core';
import { GENDERS, MEMBER_ITEMS } from '../data/member.items';
import { LucideAngularModule, ArrowRight, ArrowLeft } from 'lucide-angular';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { SelectModule } from 'primeng/select';
import { countryCode } from '../../../shared/data/countryItem.data';
import { StepperModule } from 'primeng/stepper';
import { DatePickerModule } from 'primeng/datepicker';
import { TextareaModule } from 'primeng/textarea';
import { CommonModule } from '@angular/common';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-join-us',
  imports: [
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
    ReactiveFormsModule,
    Button
  ],
  templateUrl: './join-us.component.html',
  styles: ``
})
export class JoinUsComponent {
  memberItems = MEMBER_ITEMS;
  icons = { next: ArrowRight, previous: ArrowLeft };

  genderItems = GENDERS;
  selectedGender = this.genderItems;
  countryItem = countryCode;
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

  #fb = inject(FormBuilder);
  form: FormGroup;
  constructor() {
    this.form = this.#fb.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      gender: ['', Validators.required],
      birthdate: ['', Validators.required],
      statut: ['', Validators.required],
      country: ['', Validators.required],
      reason: ['', Validators.required],
      town: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log(this.form.value);
  }
}
