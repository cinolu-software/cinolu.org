import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProfileMenuComponent } from '../../ui/profile-menu/profile-menu.component';

@Component({
  selector: 'app-profile-layout',
  templateUrl: './profile-layout.component.html',
  imports: [RouterOutlet, ProfileMenuComponent]
})
export class ProfileLayoutComponent {}
