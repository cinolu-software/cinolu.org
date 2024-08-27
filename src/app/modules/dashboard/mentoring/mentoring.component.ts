import { Component } from '@angular/core';
import { MaintenanceComponent } from '../../maintenance/maintenance.component';

@Component({
  selector: 'app-mentoring',
  standalone: true,
  imports: [MaintenanceComponent],
  templateUrl: './mentoring.component.html'
})
export class MentoringComponent {}
