import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProfileMenuComponent } from '../../ui/profile-menu/profile-menu.component';
import { ProfileTopbarComponent } from '../../ui/profile-topbar/profile-topbar.component';

@Component({
  selector: 'app-profile-layout',
  templateUrl: './profile-layout.component.html',
  imports: [RouterOutlet, ProfileMenuComponent, ProfileTopbarComponent],
})
export class ProfileLayoutComponent {}
