import { Component } from '@angular/core';
import { MaintenanceComponent } from '../../maintenance/maintenance.component';

@Component({
  selector: 'app-coaching',
  standalone: true,
  imports: [MaintenanceComponent],
  templateUrl: './coaching.component.html'
})
export class CoachingComponent {}
