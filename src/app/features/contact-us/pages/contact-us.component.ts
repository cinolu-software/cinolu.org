import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { CONTACT_ITEMS } from '../data/contact.data';
import { FormsModule, NgForm } from '@angular/forms';
import { countryCode } from '../data/countryItem.data';

@Component({
  selector: 'app-contact-us',
  imports: [LucideAngularModule, FormsModule],
  standalone: true,
  templateUrl: './contact-us.component.html',
  styles: ``
})
export class ContactUsComponent {
  countryItems = countryCode;
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
