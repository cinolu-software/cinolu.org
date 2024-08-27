import { Component } from '@angular/core';
import { MaintenanceComponent } from '../../maintenance/maintenance.component';

@Component({
  selector: 'app-submit-project',
  standalone: true,
  imports: [MaintenanceComponent],
  templateUrl: './submit-project.component.html'
})
export class SubmitProjectComponent {}
