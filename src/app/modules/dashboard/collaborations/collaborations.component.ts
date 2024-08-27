import { Component } from '@angular/core';
import { MaintenanceComponent } from '../../maintenance/maintenance.component';

@Component({
  selector: 'app-collaborations',
  standalone: true,
  imports: [MaintenanceComponent],
  templateUrl: './collaborations.component.html'
})
export class CollaborationsComponent {}
