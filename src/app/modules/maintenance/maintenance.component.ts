import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { TopbarComponent } from '../../core/components/topbar/topbar.component';

@Component({
  selector: 'maintenance',
  templateUrl: './maintenance.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [TopbarComponent]
})
export class MaintenanceComponent {
  constructor() {}
}
