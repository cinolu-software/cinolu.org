import { Component, input, output, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ILink } from '../../../utils/types/link.type';
import { getLinks } from '../../../../utils/helpers/get-links.fn';
import { IUser } from '../../../../utils/types/models.type';
import { ApiImgPipe } from '../../../../pipes/api-img.pipe';
import { LucideAngularModule, Menu, X, ChevronDown, ArrowLeft } from 'lucide-angular';

@Component({
  selector: 'app-mobile-profile-menu',
  templateUrl: './mobile-profile-menu.component.html',
  imports: [LucideAngularModule, NgOptimizedImage, RouterModule, CommonModule, ApiImgPipe]
})
export class MobileProfileMenuComponent {
  user = input.required<IUser | null>();
  links = input.required<ILink[]>();
  singOut = output<void>();
  isOpen = signal<boolean>(false);
  getLinks = getLinks;
  icons = {
    menu: Menu,
    close: X,
    arrowDown: ChevronDown,
    moveLeft: ArrowLeft
  };

  toogleNav(): void {
    this.isOpen.update((isOpen) => !isOpen);
  }

  handleSignOut(): void {
    this.singOut.emit();
  }

  closeNav(): void {
    this.isOpen.set(false);
  }
}
