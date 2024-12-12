import { Component, input } from '@angular/core';
import { IVenture } from '../../../shared/utils/types/models.type';
import { MatIconModule } from '@angular/material/icon';
import { VentureCardComponent } from '../../ui/ventures/ventures-card.component';

@Component({
  selector: 'app-user-ventures',
  imports: [MatIconModule, VentureCardComponent],
  templateUrl: './ventures.component.html'
})
export class UserVenturesComponent {
  ventures = input.required<IVenture[]>();
}
