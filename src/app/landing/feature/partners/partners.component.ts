import { Component } from '@angular/core';
import { partners } from '../../utils/data/partners';

@Component({
  selector: 'app-partners',
  imports: [],
  templateUrl: './partners.component.html'
})
export class PartnersComponent {
  partners = partners;
}
