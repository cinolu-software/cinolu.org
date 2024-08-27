import { Component } from '@angular/core';
import { MaintenanceComponent } from '../../maintenance/maintenance.component';

@Component({
  selector: 'app-programs',
  standalone: true,
  imports: [MaintenanceComponent],
  templateUrl: './programs.component.html'
})
export class ProgramsComponent {}
