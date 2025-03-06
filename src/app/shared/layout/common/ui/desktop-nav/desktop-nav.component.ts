import { Component, input, output, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { IUser } from '../../../../utils/types/models.type';
import { ILink } from '../../../../utils/types/link.type';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiImgPipe } from '../../../../pipes/api-img.pipe';
import { GetLinksPipe } from '../../../../pipes/get-links.pipe';

@Component({
  selector: 'app-desktop-nav',
  host: {
    '(document:click)': 'onClickOutside($event)'
  },
  templateUrl: './desktop-nav.component.html',
  imports: [MatIconModule, CommonModule, RouterModule, ApiImgPipe, GetLinksPipe]
})
export class DesktopNavComponent {
  user = input.required<IUser>();
  accountUrl = input.required<string>();
  tabs = input.required<string[]>();
  links = input.required<Record<string, ILink[]>>();
  singOut = output<void>();
  activeTab = signal<string>('');

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
}
