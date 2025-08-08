import { Component } from '@angular/core';
import { IMemberItem, TEAM_MEMBERS } from '../../data/our-team.data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-our-team',
  imports: [CommonModule],
  templateUrl: './our-team.component.html',
  styles: ``,
})
export class OurTeamComponent {
  our_team = TEAM_MEMBERS;

  selectedMember: IMemberItem = TEAM_MEMBERS[0];

  selectMember(member: IMemberItem): void {
    this.selectedMember = member;
  }
}
