import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProfileMenuComponent } from '../../ui/profile-menu/profile-menu.component';
import { ProfileSidebarComponent } from '../../ui/sidebar/profile-sidebar.component';

@Component({
  selector: 'app-profile-layout',
  templateUrl: './profile-layout.component.html',
  imports: [RouterOutlet, ProfileMenuComponent, ProfileSidebarComponent]
})
export class ProfileLayoutComponent {}
