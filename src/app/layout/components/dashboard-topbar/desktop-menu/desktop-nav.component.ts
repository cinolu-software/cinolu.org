import { Component, input, output, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, LogOut, ChevronDown } from 'lucide-angular';
import { IUser } from '../../../../shared/models/entities.models';
import { ApiImgPipe } from '../../../../shared/pipes/api-img.pipe';

@Component({
  selector: 'app-desktop-nav',
  templateUrl: './desktop-nav.component.html',
  imports: [
    CommonModule,
    RouterModule,
    ApiImgPipe,
    LucideAngularModule,
    NgOptimizedImage,
  ],
})
export class DesktopNavComponent {
  user = input.required<IUser | null>();
  signOut = output<void>();
  activeTab = signal<string>('');
  icons = { chevronDown: ChevronDown, logOut: LogOut };

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
