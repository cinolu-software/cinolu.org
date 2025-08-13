import { Component, inject, input, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  LucideAngularModule,
  ChevronDown,
  Menu,
  X,
  ArrowLeft,
} from 'lucide-angular';
import { ILink } from '../../../data/links.data';
import { ApiImgPipe } from '../../../../shared/pipes/api-img.pipe';
import { AuthStore } from '../../../../core/auth/auth.store';

@Component({
  selector: 'app-mobile-nav',
  imports: [
    RouterModule,
    NgOptimizedImage,
    CommonModule,
    LucideAngularModule,
    ApiImgPipe,
  ],
  templateUrl: './mobile-nav.html',
})
export class MobileNav {
  isOpen = signal<boolean>(false);
  links = input.required<ILink[]>();
  authStore = inject(AuthStore);
  icons = { menu: Menu, close: X, arrowDown: ChevronDown, moveLeft: ArrowLeft };

  toggleNav(): void {
    this.isOpen.update((isOpen) => !isOpen);
  }

  onSignOut(): void {
    this.authStore.signOut();
  }

  closeNav(): void {
    this.isOpen.set(false);
  }
}
