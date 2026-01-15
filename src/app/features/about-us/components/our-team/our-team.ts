import { Component } from '@angular/core';
import { IMemberItem, TEAM_MEMBERS } from '../../data/our-team.data';
import { SOCIAL_LINKS } from '@features/contact-us/data/contact.data';

@Component({
  selector: 'app-our-team',
  imports: [],
  templateUrl: './our-team.html'
})
export class OurTeam {
  our_team = TEAM_MEMBERS;

  socialLinks = SOCIAL_LINKS;
  selectedMember: IMemberItem = TEAM_MEMBERS[0];

  selectMember(member: IMemberItem): void {
    this.selectedMember = member;
  }
}
