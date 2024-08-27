import { Component } from '@angular/core';
import { MaintenanceComponent } from '../../maintenance/maintenance.component';

@Component({
  selector: 'app-my-enterprise',
  standalone: true,
  imports: [MaintenanceComponent],
  templateUrl: './my-enterprise.component.html'
})
export class MyEnterpriseComponent {}
