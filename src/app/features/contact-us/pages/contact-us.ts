import { Component, inject } from '@angular/core';
import { Headset, LucideAngularModule } from 'lucide-angular';
import { CONTACT_ITEMS, SOCIAL_LINKS } from '../data/contact.data';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { COUNTRY_CODE } from '../../../shared/data/country-item.data';
import { FadeInOnScrollDirective } from '../../../shared/directives/animations-on-scroll.directive';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectChangeEvent, SelectModule } from 'primeng/select';
import { InputGroupAddon } from 'primeng/inputgroupaddon';
import { InputGroup } from 'primeng/inputgroup';
import { ButtonModule } from 'primeng/button';
import { GENDERS } from '../../../shared/data/genders.data';
import { ContactUsStore } from '../store/contact-us.store';
import { HeroCard } from '../../../layout/components/hero-card/hero-card';

@Component({
  selector: 'app-contact-us',
  providers: [ContactUsStore],
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
    ButtonModule,
    HeroCard,
  ],
  standalone: true,
  templateUrl: './contact-us.html',
})
export class ContactUs {
  icons = {
    phone: Headset,
  };
  countryItems = COUNTRY_CODE;
  contactItems = CONTACT_ITEMS;
  #formBuilder: FormBuilder = inject(FormBuilder);
  store = inject(ContactUsStore);
  form: FormGroup;
  selectedCountryCode = '';
  genderItems = GENDERS;
  socialMediaItems = SOCIAL_LINKS;

  constructor() {
    this.form = this.#formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.email, Validators.required]],
      phone_number: ['', [Validators.required, Validators.pattern(/^\+?[1-9]\d{1,14}$/)]],
      country: ['', [Validators.required]],
      message: ['', [Validators.required]],
    });
  }

  onSelectCountry(event: SelectChangeEvent): void {
    const value = event.value;
    this.selectedCountryCode = this.countryItems.find((item) => item.name === value)?.code || '';
  }

  onSubmit() {
    this.store.contactUs({
      payload: {
        ...this.form.value,
        phone_number: this.selectedCountryCode + this.form.value.phone_number,
      },
      onSuccess: () => {
        this.form.reset();
        this.selectedCountryCode = '';
      },
    });
  }
}
