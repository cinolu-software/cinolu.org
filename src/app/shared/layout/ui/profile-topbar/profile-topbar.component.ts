import { Component, signal } from '@angular/core';
import { PROFILE_LINKS } from '../../utils/data/links';
import { RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-profile-topbar',
  imports: [LucideAngularModule, RouterModule],
  templateUrl: './profile-topbar.component.html',
})
export class ProfileTopbarComponent {
  links = signal(PROFILE_LINKS);
}
