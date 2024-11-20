import { Component } from '@angular/core';
import { CoachComponent } from './components/coachs/coachs.component';
import { StaffComponent } from './components/staff/staff.component';

@Component({
    selector: 'app-team',
    imports: [CoachComponent, StaffComponent],
    templateUrl: './team.component.html'
})
export class TeamComponent {}
