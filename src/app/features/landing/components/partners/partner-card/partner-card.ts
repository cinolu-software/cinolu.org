import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { IPartner } from '../../../data/partners.data';

@Component({
  selector: 'app-partner-card',
  standalone: true,
  templateUrl: './partner-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PartnerCard {
  @Input({ required: true }) partner!: IPartner;
}
