import { Component, input, output, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiImgPipe } from '../../../../pipes/api-img.pipe';
import { ILink } from '../../../utils/types/link.type';
import { getLinks } from '../../../../utils/helpers/get-links.fn';
import { IUser } from '../../../../utils/types/models.type';
import { LucideAngularModule, LogOut, ChevronDown } from 'lucide-angular';

@Component({
  selector: 'app-desktop-profile-menu',
  templateUrl: './desktop-profile-menu.component.html',
  imports: [CommonModule, RouterModule, ApiImgPipe, LucideAngularModule, NgOptimizedImage]
})
export class DesktopProfileMenuComponent {
  user = input.required<IUser | null>();
  tabs = input.required<string[]>();
  links = input.required<Record<string, ILink[]>>();
  singOut = output<void>();
  activeTab = signal<string | null>(null);
  getLinks = getLinks;
  icons = {
    chevronDown: ChevronDown,
    logOut: LogOut
  };

  closeNav(): void {
    this.setActiveTab(null);
  }

  setActiveTab(tab: string | null): void {
    this.activeTab.set(tab);
  }

  handleSignOut(): void {
    this.singOut.emit();
  }
}
