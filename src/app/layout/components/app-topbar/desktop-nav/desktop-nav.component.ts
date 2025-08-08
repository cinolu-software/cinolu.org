import { Component, inject, input, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  LucideAngularModule,
  ChevronDown,
  LayoutGrid,
  LogOut,
} from 'lucide-angular';
import { ILink } from '../../../data/links.data';
import { ApiImgPipe } from '../../../../shared/pipes/api-img.pipe';
import { AuthStore } from '../../../../core/auth/auth.store';

@Component({
  selector: 'app-desktop-nav',
  templateUrl: './desktop-nav.component.html',
  imports: [
    CommonModule,
    NgOptimizedImage,
    LucideAngularModule,
    RouterModule,
    ApiImgPipe,
  ],
})
export class DesktopNavComponent {
  links = input.required<ILink[]>();
  activeTab = signal<string | null>(null);
  authStore = inject(AuthStore);
  icons = { chevronDown: ChevronDown, dashboard: LayoutGrid, logOut: LogOut };

  closeNav(): void {
    this.setActiveTab(null);
  }

  setActiveTab(tab: string | null): void {
    this.activeTab.set(tab);
  }

  onSignOut(): void {
    this.authStore.signOut();
  }
}
