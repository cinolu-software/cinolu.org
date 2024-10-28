import { Component } from '@angular/core';
import { CoachComponent } from './slots/coachs/coachs.component';
import { StaffComponent } from './slots/staff/staff.component';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CoachComponent, StaffComponent],
  templateUrl: './team.component.html'
})
export class TeamComponent {}
