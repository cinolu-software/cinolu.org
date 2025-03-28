import { Component, input, output, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { ApiImgPipe } from '../../../../pipes/api-img.pipe';
import { IUser } from '../../../../utils/types/models.type';
import { ILink } from '../../../utils/types/link.type';
import { getLinks } from 'app/shared/utils/helpers/get-links.fn';

@Component({
  selector: 'app-desktop-nav',
  host: {
    '(document:click)': 'onClickOutside($event)',
    '(window:scroll)': 'onWindowScroll()'
  },
  templateUrl: './desktop-nav.component.html',
  imports: [CommonModule, RouterModule, NgOptimizedImage, ApiImgPipe, NgIcon]
})
export class DesktopNavComponent {
  user = input.required<IUser>();
  accountUrl = input.required<string>();
  tabs = input.required<string[]>();
  links = input.required<Record<string, ILink[]>>();
  singOut = output<void>();
  activeTab = signal<string>('');
  getLinks = getLinks;

  close(): void {
    this.setActiveTab(null);
  }

  setActiveTab(tab: string): void {
    this.activeTab.set(tab);
  }

  handleSignOut(): void {
    this.singOut.emit();
    this.setActiveTab(null);
  }

  onClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const activeNav = document.querySelector('.active-nav');
    if (target?.closest('.menu')) return;
    if ((this.activeTab() && activeNav) || activeNav?.contains(target)) {
      this.setActiveTab(null);
    }
  }

  onWindowScroll(): void {
    if (this.activeTab()) this.activeTab.set(null);
  }
}
