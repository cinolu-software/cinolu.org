import { Component, inject } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { CONTACT_ITEMS, SOCIAL_LINKS } from '../data/contact.data';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { COUNTRY_CODE } from '../../../../shared/data/country-item.data';
import { FadeInOnScrollDirective } from '../../../../shared/directives/animations-on-scroll.directive';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectChangeEvent, SelectModule } from 'primeng/select';
import { InputGroupAddon } from 'primeng/inputgroupaddon';
import { InputGroup } from 'primeng/inputgroup';
import { ButtonModule } from 'primeng/button';
import { GENDERS } from '../../join-us/data/member.items';

@Component({
  selector: 'app-contact-us',
  imports: [
    LucideAngularModule,
    FormsModule,
    FadeInOnScrollDirective,
    ReactiveFormsModule,
    InputTextModule,
    TextareaModule,
    InputGroupAddon,
    InputGroup,
    SelectModule,
    ButtonModule
  ],
  standalone: true,
  templateUrl: './contact-us.component.html',
  styles: ``
})
export class ContactUsComponent {
  countryItems = COUNTRY_CODE;
  contactItems = CONTACT_ITEMS;
  #formBuilder: FormBuilder = inject(FormBuilder);
  form: FormGroup;
  selectedCountryCode = '';
  genderItems = GENDERS;
  socialMediaItems = SOCIAL_LINKS;

  constructor() {
    this.form = this.#formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.email, Validators.required]],
      phone_number: ['', [Validators.required, Validators.pattern(/^\+?[1-9]\d{1,14}$/)]],
      gender: ['', [Validators.required]],
      country: ['', [Validators.required]],
      city: ['', [Validators.required]],
      message: ['', [Validators.required]]
    });
  }

  onSelectCountry(event: SelectChangeEvent): void {
    const value = event.value;
    this.selectedCountryCode = this.countryItems.find((item) => item.name === value)?.code || '';
  }

  onSubmit() {
    console.log(this.form.value);
  }
}
