import { Component, input, computed, signal, inject } from '@angular/core';
import { NgOptimizedImage, NgClass } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { TranslateModule } from '@ngx-translate/core';
import { ILink } from '../../../data/links.data';
import { AuthStore } from '@core/auth/auth.store';
import { ApiImgPipe } from '@shared/pipes';
import { IProgram } from '@shared/models';
import { LanguageSwitcherComponent } from '../../language-switcher/language-switcher';
import { TOPBAR_ICONS } from '../topbar.config';
import { LanguageService } from '@core/services/language/language.service';

@Component({
  selector: 'app-desktop-nav',
  templateUrl: './desktop-nav.html',
  imports: [
    LucideAngularModule,
    ApiImgPipe,
    NgOptimizedImage,
    RouterModule,
    LanguageSwitcherComponent,
    TranslateModule,
    NgClass
  ],
  host: {
    '(document:click)': 'onDocumentClick($event)'
  }
})
export class DesktopNav {
  private languageService = inject(LanguageService);

  links = input.required<ILink[]>();
  programs = input.required<IProgram[]>();
  onestopUrl = input.required<string>();
  authStore = input.required<InstanceType<typeof AuthStore>>();

  icons = TOPBAR_ICONS;

  user = computed(() => this.authStore().user());

  openDropdown = signal<string | null>(null);

  translateField = computed(() => {
    const currentLang = this.languageService.currentLanguage();
    return (value: string | null | undefined, fieldName: string, obj: unknown): string => {
      if (!value) return '';
      if (currentLang === 'fr') return value;
      if (obj && fieldName && typeof obj === 'object' && obj !== null) {
        const translatedField = `${fieldName}_${currentLang}`;
        const translatedValue = (obj as Record<string, unknown>)[translatedField];
        return (translatedValue as string) || value;
      }
      return value;
    };
  });

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
    const target = event.target as HTMLElement;
    if (!target.closest('.group')) {
      this.openDropdown.set(null);
    }
  }

  onSignOut(): void {
    this.authStore().signOut();
  }

  getUserInitials(): string {
    const name = this.user()?.name || 'U';
    return name
      .split(' ')
      .map((n: string) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }
}
