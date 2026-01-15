import { Component, input, ChangeDetectionStrategy, computed, signal } from '@angular/core';
import { NgOptimizedImage, NgClass } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { TranslateModule } from '@ngx-translate/core';
import { ILink } from '../../../data/links.data';
import { AuthStore } from '@core/auth/auth.store';
import { ApiImgPipe, TranslateFieldPipe } from '@shared/pipes';
import { IProgram } from '@shared/models';
import { LanguageSwitcherComponent } from '../../language-switcher/language-switcher.component';
import { TOPBAR_ICONS } from '../topbar.config';

@Component({
  selector: 'app-desktop-nav',
  templateUrl: './desktop-nav.html',
  imports: [
    LucideAngularModule,
    ApiImgPipe,
    TranslateFieldPipe,
    NgOptimizedImage,
    RouterModule,
    LanguageSwitcherComponent,
    TranslateModule,
    NgClass
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:click)': 'onDocumentClick($event)'
  }
})
export class DesktopNav {
  // Inputs
  readonly links = input.required<ILink[]>();
  readonly programs = input.required<IProgram[]>();
  readonly onestopUrl = input.required<string>();
  readonly authStore = input.required<InstanceType<typeof AuthStore>>();

  // Configuration
  readonly icons = TOPBAR_ICONS;

  // Computed
  readonly user = computed(() => this.authStore().user());

  // State for touch interactions
  readonly openDropdown = signal<string | null>(null);

  toggleDropdown(dropdownId: string, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    if (this.openDropdown() === dropdownId) {
      this.openDropdown.set(null);
    } else {
      this.openDropdown.set(dropdownId);
    }
  }

  isDropdownOpen(dropdownId: string): boolean {
    return this.openDropdown() === dropdownId;
  }

  onDocumentClick(event: Event): void {
    // Fermer tous les dropdowns quand on clique ailleurs
    const target = event.target as HTMLElement;
    if (!target.closest('.group')) {
      this.openDropdown.set(null);
    }
  }

  onSignOut(): void {
    this.authStore().signOut();
  }
}
