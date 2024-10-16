import { Component } from '@angular/core';
import { CoachComponent } from './components/coachs/coachs.component';
import { StaffMembersComponent } from './components/staff-members/staff-members.component';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CoachComponent, StaffMembersComponent],
  templateUrl: './team.component.html'
})
export class TeamComponent {}
