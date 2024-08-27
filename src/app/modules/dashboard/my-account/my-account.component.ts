import { Component } from '@angular/core';
import { MaintenanceComponent } from '../../maintenance/maintenance.component';

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [MaintenanceComponent],
  templateUrl: './my-account.component.html'
})
export class MyAccountComponent {}
