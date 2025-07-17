import { Component, input, output, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiImgPipe } from '../../../pipes/api-img.pipe';
import { IUser } from '../../../utils/types/models.type';
import { LucideAngularModule, ChevronDown, Menu, X, ArrowLeft } from 'lucide-angular';
import { ILink } from '../../../utils/types/link.type';

@Component({
  selector: 'app-mobile-nav',
  imports: [RouterModule, NgOptimizedImage, CommonModule, LucideAngularModule, ApiImgPipe],
  templateUrl: './mobile-nav.component.html'
})
export class MobileNavComponent {
  user = input.required<IUser | null>();
  links = input.required<ILink[]>();
  singOut = output<void>();
  isOpen = signal<boolean>(false);
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
