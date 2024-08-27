import { Component } from '@angular/core';
import { MaintenanceComponent } from '../../maintenance/maintenance.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [MaintenanceComponent],
  templateUrl: './projects.component.html'
})
export class ProjectsComponent {}
