import { Component, input, output, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, ChevronDown, LayoutGrid, LogOut } from 'lucide-angular';
import { ILink } from '../../../data/links.data';
import { IUser } from '../../../../shared/models/entities.models';
import { ApiImgPipe } from '../../../../shared/pipes/api-img.pipe';

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
