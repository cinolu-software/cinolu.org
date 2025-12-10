import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IPartner } from '../../../landing/data/partners.data';

@Component({
  selector: 'app-parteners-card',
  imports: [CommonModule],
  templateUrl: './parteners-card.html'
})
export class PartenersCard {
  partner = input.required<IPartner | null>();
}
