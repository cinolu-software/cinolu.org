import { Component, input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiImgPipe } from '../../../../pipes/api-img.pipe';
import { IUser } from '../../../../utils/types/models.type';
import { LucideAngularModule, LogOut, ChevronDown } from 'lucide-angular';

@Component({
  selector: 'app-desktop-profile-menu',
  templateUrl: './desktop-profile-menu.component.html',
  imports: [CommonModule, RouterModule, ApiImgPipe, LucideAngularModule, NgOptimizedImage]
})
export class DesktopProfileMenuComponent {
  user = input.required<IUser | null>();
  icons = {
    chevronDown: ChevronDown,
    logOut: LogOut
  };
}
