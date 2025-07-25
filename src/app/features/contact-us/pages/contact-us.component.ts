import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { CONTACT_ITEMS } from '../data/contact.data';

@Component({
  selector: 'app-contact-us',
  imports: [LucideAngularModule],
  templateUrl: './contact-us.component.html',
  styles: ``
})
export class ContactUsComponent {
  contactItems = CONTACT_ITEMS;
}
