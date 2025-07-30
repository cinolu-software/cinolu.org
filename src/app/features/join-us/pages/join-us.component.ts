import { Component, inject } from '@angular/core';
import { GENDERS, MEMBER_ITEMS } from '../data/member.items';
import { LucideAngularModule, ArrowRight, ArrowLeft } from 'lucide-angular';
import { RouterLink } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { SelectModule } from 'primeng/select';
import { countryCode } from '../../../shared/data/country-item.data';
import { StepperModule } from 'primeng/stepper';
import { Button } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { Router } from '@angular/router';
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'app-join-us',
  imports: [
    LucideAngularModule,
    RouterLink,
    InputTextModule,
    FormsModule,
    FloatLabelModule,
    PasswordModule,
    SelectModule,
    StepperModule,
    Button,
    DatePickerModule,
    TextareaModule
  ],
  templateUrl: './join-us.component.html',
  styles: ``
})
export class JoinUsComponent {
  memberItems = MEMBER_ITEMS;
  router = inject(Router);
  icons = { next: ArrowRight, previous: ArrowLeft };

  genderItems = GENDERS;
  selectedGender = this.genderItems;

  countryItem = countryCode;
  statusItem = [
    { id: 1, name: 'Étudiant·e' },
    { id: 2, name: 'Entrepreneur·e' },
    { id: 3, name: 'Volontaire' },
    { id: 4, name: 'Chercheur·se' },
    { id: 5, name: 'Autre' }
  ];

  date: Date | undefined;
  activePath = this.memberItems[0].path;
}
