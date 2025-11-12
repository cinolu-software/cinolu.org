import { Component, inject, input, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, ChevronDown, Menu, X, ArrowLeft, ChevronRight, Minus } from 'lucide-angular';
import { TranslateModule } from '@ngx-translate/core';
import { ILink } from '../../../data/links.data';
import { ApiImgPipe, TranslateFieldPipe } from '@shared/pipes';
import { AuthStore } from '@core/auth/auth.store';
import { IProgram } from '@shared/models';
import { LanguageSwitcherComponent } from '../../language-switcher/language-switcher.component';

@Component({
  selector: 'app-mobile-nav',
  imports: [
    RouterModule,
    NgOptimizedImage,
    CommonModule,
    LucideAngularModule,
    ApiImgPipe,
    TranslateFieldPipe,
    LanguageSwitcherComponent,
    TranslateModule
  ],
  templateUrl: './mobile-nav.html'
})
export class MobileNav {
  isOpen = signal<boolean>(false);
  links = input.required<ILink[]>();
  programs = input.required<IProgram[]>();
  authStore = inject(AuthStore);
  onestopUrl = input.required<string>();
  icons = {
    menu: Menu,
    close: X,
    arrowDown: ChevronDown,
    moveLeft: ArrowLeft,
    chevronRight: ChevronRight,
    plus: Minus
  };

  programsOpen = signal<boolean>(false);

  toggleNav(): void {
    this.isOpen.update((isOpen) => !isOpen);
  }

  closeNav(): void {
    this.isOpen.set(false);
  }

  onSignOut(): void {
    this.authStore.signOut();
  }

  toggleLink(index: number): void {
    this.links().forEach((l, i) => {
      l.open = i === index ? !l.open : false;
    });
  }
  togglePrograms(): void {
    this.programsOpen.update((v) => !v);
  }
}
