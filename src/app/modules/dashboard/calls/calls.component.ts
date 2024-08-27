import { Component } from '@angular/core';
import { MaintenanceComponent } from '../../maintenance/maintenance.component';

@Component({
  selector: 'app-calls',
  standalone: true,
  imports: [MaintenanceComponent],
  templateUrl: './calls.component.html'
})
export class CallsComponent {}
