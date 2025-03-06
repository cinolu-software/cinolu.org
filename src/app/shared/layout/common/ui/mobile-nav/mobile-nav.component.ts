import { Component, input, output, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { IUser } from '../../../../utils/types/models.type';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ApiImgPipe } from '../../../../pipes/api-img.pipe';
import { RouterModule } from '@angular/router';
import { ILink } from '../../../../utils/types/link.type';
import { GetLinksPipe } from '../../../../pipes/get-links.pipe';

@Component({
  selector: 'app-mobile-nav',
  host: {
    '(document:click)': 'onClickOutside($event)'
  },
  templateUrl: './mobile-nav.component.html',
  imports: [MatIconModule, RouterModule, NgOptimizedImage, CommonModule, ApiImgPipe, GetLinksPipe]
})
export class MobileNavComponent {
  user = input.required<IUser>();
  accountUrl = input.required<string>();
  tabs = input.required<string[]>();
  links = input.required<Record<string, ILink[]>>();
  singOut = output<void>();
  isOpen = signal<boolean>(false);
  activeTab = signal<string>('');

  toogleNav(): void {
    this.isOpen.update((isOpen) => !isOpen);
  }

  setActiveTab(tab: string): void {
    this.activeTab.set(tab);
  }

  handleSignOut(): void {
    this.singOut.emit();
  }

  closeMenu(): void {
    this.isOpen.set(false);
    this.activeTab.set(null);
  }

  onClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const activeNav = document.querySelector('.active-nav');
    if (target?.closest('.menu')) return;
    if (((this.activeTab() || this.isOpen()) && activeNav) || activeNav?.contains(target)) {
      this.closeMenu();
    }
  }
}
