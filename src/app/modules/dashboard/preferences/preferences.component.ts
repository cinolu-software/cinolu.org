import { Component } from '@angular/core';
import { MaintenanceComponent } from '../../maintenance/maintenance.component';

@Component({
  selector: 'app-preferences',
  standalone: true,
  imports: [MaintenanceComponent],
  templateUrl: './preferences.component.html'
})
export class PreferencesComponent {}
