import { Component } from '@angular/core';
import { CoachComponent } from './slots/coachs/coachs.component';
import { StaffMembersComponent } from './slots/staff-members/staff-members.component';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CoachComponent, StaffMembersComponent],
  templateUrl: './team.component.html'
})
export class TeamComponent {}
