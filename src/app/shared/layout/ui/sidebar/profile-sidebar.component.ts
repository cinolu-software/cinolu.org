import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PROFILE_LINKS } from '../../utils/data/links';
import { LucideAngularModule, ChevronRight, LogOut, ArrowLeft } from 'lucide-angular';
import { AuthStore } from '../../../store/auth.store';

@Component({
  selector: 'app-profile-sidebar.',
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './profile-sidebar..component.html'
})
export class ProfileSidebarComponent {
  links = signal(PROFILE_LINKS);
  activeTab = signal('Mon compte');
  authStore = inject(AuthStore);
  icons = {
    chevronRight: ChevronRight,
    logout: LogOut,
    back: ArrowLeft
  };

  setActiveTab(tab: string): void {
    this.activeTab.set(tab);
  }

  logout(): void {
    this.authStore.signOut();
  }
}
