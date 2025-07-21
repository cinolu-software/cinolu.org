import { Component, input, output, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiImgPipe } from '../../../pipes/api-img.pipe';
import { IUser } from '../../../utils/types/models.type';
import { LucideAngularModule, LogOut, ChevronDown } from 'lucide-angular';
import { getLinks } from '../../../utils/helpers/get-links.fn';

@Component({
  selector: 'app-desktop-nav',
  templateUrl: './desktop-nav.component.html',
  imports: [CommonModule, RouterModule, ApiImgPipe, LucideAngularModule, NgOptimizedImage]
})
export class DesktopNavComponent {
  user = input.required<IUser | null>();
  signOut = output<void>();
  activeTab = signal<string>('');
  getLinks = getLinks;
  icons = {
    chevronDown: ChevronDown,
    logOut: LogOut
  };

  closeNav(): void {
    this.setActiveTab('');
  }

  setActiveTab(tab: string): void {
    this.activeTab.set(tab);
  }

  handleSignOut(): void {
    this.signOut.emit();
    this.setActiveTab('');
  }
}
