import { Component, signal } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { PROFILE_LINKS } from '../../utils/data/links';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile-topbar',
  imports: [NgIcon, RouterModule],
  templateUrl: './profile-topbar.component.html',
})
export class ProfileTopbarComponent {
  links = signal(PROFILE_LINKS);
}
