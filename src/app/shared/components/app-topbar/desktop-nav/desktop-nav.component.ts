import { Component, input, output, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiImgPipe } from '../../../pipes/api-img.pipe';
import { IUser } from '../../../utils/types/models.type';
import { ILink } from '../../../utils/types/link.type';
import { LucideAngularModule, ChevronDown, LayoutGrid, LogOut } from 'lucide-angular';

@Component({
  selector: 'app-desktop-nav',
  templateUrl: './desktop-nav.component.html',
  imports: [CommonModule, NgOptimizedImage, LucideAngularModule, RouterModule, ApiImgPipe]
})
export class DesktopNavComponent {
  user = input.required<IUser | null>();
  links = input.required<ILink[]>();
  signOut = output<void>();
  activeTab = signal<string | null>(null);
  icons = {
    chevronDown: ChevronDown,
    dashboard: LayoutGrid,
    logOut: LogOut
  };

  closeNav(): void {
    this.setActiveTab(null);
  }

  setActiveTab(tab: string | null): void {
    this.activeTab.set(tab);
  }

  handleSignOut(): void {
    this.signOut.emit();
  }
}
