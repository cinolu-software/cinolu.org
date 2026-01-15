import { Component, input, signal, ChangeDetectionStrategy, computed } from '@angular/core';
import { NgOptimizedImage, NgClass } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { TranslateModule } from '@ngx-translate/core';
import { ILink } from '../../../data/links.data';
import { ApiImgPipe, TranslateFieldPipe } from '@shared/pipes';
import { AuthStore } from '@core/auth/auth.store';
import { IProgram } from '@shared/models';
import { LanguageSwitcherComponent } from '../../language-switcher/language-switcher.component';
import { TOPBAR_ICONS, TOPBAR_ANIMATION } from '../topbar.config';

@Component({
  selector: 'app-mobile-nav',
  imports: [
    RouterModule,
    NgOptimizedImage,
    LucideAngularModule,
    ApiImgPipe,
    TranslateFieldPipe,
    LanguageSwitcherComponent,
    TranslateModule,
    NgClass
  ],
  templateUrl: './mobile-nav.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MobileNav {
  links = input.required<ILink[]>();
  programs = input.required<IProgram[]>();
  onestopUrl = input.required<string>();
  authStore = input.required<InstanceType<typeof AuthStore>>();

  isOpen = signal<boolean>(false);
  programsOpen = signal<boolean>(false);
  openLinkIndex = signal<number | null>(null);

  icons = TOPBAR_ICONS;
  animation = TOPBAR_ANIMATION;

  user = computed(() => this.authStore().user());

  toggleNav(): void {
    this.isOpen.update((isOpen) => !isOpen);
  }

  closeNav(): void {
    this.isOpen.set(false);
    this.openLinkIndex.set(null);
    this.programsOpen.set(false);
  }

  onSignOut(): void {
    this.authStore().signOut();
  }

  toggleLink(index: number): void {
    this.openLinkIndex.update((current) => (current === index ? null : index));
  }

  isLinkOpen(index: number): boolean {
    return this.openLinkIndex() === index;
  }

  togglePrograms(): void {
    this.programsOpen.update((v) => !v);
  }

  getSubMenuMaxHeight(childrenLength: number): string {
    return `${childrenLength * this.animation.mobileSubItemHeight}px`;
  }

  getProgramsMaxHeight(): string {
    return `${this.programs().length * this.animation.mobileProgramItemHeight}px`;
  }
}
