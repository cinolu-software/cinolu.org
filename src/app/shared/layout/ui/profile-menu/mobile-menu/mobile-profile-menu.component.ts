import { Component, input, output, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { ILink } from '../../../utils/types/link.type';
import { getLinks } from '../../../../utils/helpers/get-links.fn';
import { IUser } from '../../../../utils/types/models.type';
import { ApiImgPipe } from '../../../../pipes/api-img.pipe';

@Component({
  selector: 'app-mobile-profile-menu',
  templateUrl: './mobile-profile-menu.component.html',
  imports: [NgIcon, NgOptimizedImage, RouterModule, CommonModule, ApiImgPipe],
})
export class MobileProfileMenuComponent {
  user = input.required<IUser | null>();
  tabs = input.required<string[]>();
  links = input.required<Record<string, ILink[]>>();
  singOut = output<void>();
  isOpen = signal<boolean>(false);
  activeTab = signal<string | null>(null);
  getLinks = getLinks;

  toogleNav(): void {
    this.isOpen.update((isOpen) => !isOpen);
  }

  setActiveTab(tab: string): void {
    this.activeTab.set(tab);
  }

  handleSignOut(): void {
    this.singOut.emit();
  }

  closeNav(): void {
    this.isOpen.set(false);
    this.activeTab.set(null);
  }
}
