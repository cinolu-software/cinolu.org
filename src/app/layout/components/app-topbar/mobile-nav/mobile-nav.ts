import { Component, input, signal, ChangeDetectionStrategy, computed } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
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
    CommonModule,
    LucideAngularModule,
    ApiImgPipe,
    TranslateFieldPipe,
    LanguageSwitcherComponent,
    TranslateModule
  ],
  templateUrl: './mobile-nav.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MobileNav {
  // Inputs
  readonly links = input.required<ILink[]>();
  readonly programs = input.required<IProgram[]>();
  readonly onestopUrl = input.required<string>();
  readonly authStore = input.required<InstanceType<typeof AuthStore>>();

  // Signals
  readonly isOpen = signal<boolean>(false);
  readonly programsOpen = signal<boolean>(false);
  readonly openLinkIndex = signal<number | null>(null);

  // Configuration
  readonly icons = TOPBAR_ICONS;
  readonly animation = TOPBAR_ANIMATION;

  // Computed
  readonly user = computed(() => this.authStore().user());

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
