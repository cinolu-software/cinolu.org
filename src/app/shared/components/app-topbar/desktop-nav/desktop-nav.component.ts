import { Component, input, output } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiImgPipe } from '../../../pipes/api-img.pipe';
import { IUser } from '../../../utils/types/models.type';
import { LucideAngularModule, ChevronDown, LayoutGrid, LogOut } from 'lucide-angular';
import { ILink } from '../../../utils/types/link.type';

@Component({
  selector: 'app-desktop-nav',
  templateUrl: './desktop-nav.component.html',
  imports: [CommonModule, NgOptimizedImage, LucideAngularModule, RouterModule, ApiImgPipe]
})
export class DesktopNavComponent {
  user = input.required<IUser | null>();
  links = input.required<ILink[]>();
  singOut = output<void>();
  icons = {
    layoutDashboard: LayoutGrid,
    logOut: LogOut,
    chevronDown: ChevronDown
  };
}
