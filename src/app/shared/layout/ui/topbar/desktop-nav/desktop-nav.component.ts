import { Component, input, output, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { ApiImgPipe } from '../../../../pipes/api-img.pipe';
import { ILink } from '../../../utils/types/link.type';
import { IUser } from '../../../../utils/types/models.type';
import { getLinks } from '../../../../utils/helpers/get-links.fn';

@Component({
  selector: 'app-desktop-nav',
  templateUrl: './desktop-nav.component.html',
  imports: [CommonModule, NgOptimizedImage, RouterModule, ApiImgPipe, NgIcon],
})
export class DesktopNavComponent {
  user = input.required<IUser | null>();
  accountUrl = input.required<string>();
  tabs = input.required<string[]>();
  links = input.required<Record<string, ILink[]>>();
  singOut = output<void>();
  activeTab = signal<string | null>(null);
  getLinks = getLinks;

  closeNav(): void {
    this.setActiveTab(null);
  }

  setActiveTab(tab: string | null): void {
    this.activeTab.set(tab);
  }

  handleSignOut(): void {
    this.singOut.emit();
  }
}
