import { Component, input } from '@angular/core';
import { IPartner } from '../../../landing/data/partners.data';

@Component({
  selector: 'app-parteners-card',
  imports: [],
  templateUrl: './parteners-card.html'
})
export class PartenersCard {
  partner = input.required<IPartner | null>();
}
