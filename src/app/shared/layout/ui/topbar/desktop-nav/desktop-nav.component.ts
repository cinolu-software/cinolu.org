import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { ApiImgPipe } from '../../../../pipes/api-img.pipe';
import { IUser } from '../../../../utils/types/models.type';
import { ILink } from '../../../utils/types/link.type';
import { getLinks } from 'app/shared/utils/helpers/get-links.fn';

@Component({
  selector: 'app-desktop-nav',
  templateUrl: './desktop-nav.component.html',
  imports: [CommonModule, RouterModule, ApiImgPipe, NgIcon]
})
export class DesktopNavComponent {
  user = input.required<IUser>();
  accountUrl = input.required<string>();
  tabs = input.required<string[]>();
  links = input.required<Record<string, ILink[]>>();
  singOut = output<void>();
  activeTab = signal<string>('');
  getLinks = getLinks;

  closeNav(): void {
    this.setActiveTab(null);
  }

  setActiveTab(tab: string): void {
    this.activeTab.set(tab);
  }

  handleSignOut(): void {
    this.singOut.emit();
  }
}
