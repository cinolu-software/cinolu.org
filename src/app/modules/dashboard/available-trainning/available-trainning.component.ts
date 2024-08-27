import { Component } from '@angular/core';
import { MaintenanceComponent } from '../../maintenance/maintenance.component';

@Component({
  selector: 'app-available-trainning',
  standalone: true,
  imports: [MaintenanceComponent],
  templateUrl: './available-trainning.component.html'
})
export class AvailableTrainningComponent {}
