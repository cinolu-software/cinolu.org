import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { CONTACT_ITEMS } from '../data/contact.data';
import { FormsModule, NgForm } from '@angular/forms';
import { COUNTRY_CODE } from '../../../shared/data/country-item.data';
import { FadeInOnScrollDirective } from '../../../shared/directives/animations-on-scroll.directive';

@Component({
  selector: 'app-contact-us',
  imports: [LucideAngularModule, FormsModule, FadeInOnScrollDirective],
  standalone: true,
  templateUrl: './contact-us.component.html',
  styles: ``
})
export class ContactUsComponent {
  countryItems = COUNTRY_CODE;
  contactItems = CONTACT_ITEMS;

  formData = {
    fullname: '',
    email: '',
    countryCode: '',
    phone: '',
    message: ''
  };

  onSubmit(contactForm: NgForm) {
    console.log(contactForm.value);
    contactForm.reset();
  }
}
