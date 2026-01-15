import { Component, inject } from '@angular/core';
import { LanguageService } from '../../../core/services/language';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-language-switcher',
  imports: [TranslateModule],
  template: `
    <div class="relative">
      <button
        (click)="toggleDropdown()"
        class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-primary-500/10 active:bg-primary-500/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
        [attr.aria-label]="'Changer de langue'">
        <img [src]="currentLangInfo().flag" [alt]="currentLangInfo().name" class="w-6 h-6 rounded" />
        <span class="text-sm font-medium hidden sm:inline">
          {{ currentLangInfo().code.toUpperCase() }}
        </span>
        <svg
          class="w-4 h-4 opacity-70 transition-transform duration-200"
          [class.rotate-180]="isOpen"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      @if (isOpen) {
        <div
          class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50 animate-fade-in">
          @for (lang of languageService.availableLanguages; track lang.code) {
            <button
              (click)="selectLanguage(lang.code)"
              class="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors duration-150"
              [class.bg-primary-50]="lang.code === languageService.currentLanguage()">
              <img [src]="lang.flag" [alt]="lang.name" class="w-6 h-6 rounded" />
              <span class="text-sm font-medium text-gray-700 flex-1 text-left">{{ lang.name }}</span>
              @if (lang.code === languageService.currentLanguage()) {
                <svg class="w-5 h-5 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd" />
                </svg>
              }
            </button>
          }

          <div class="px-4 py-2 text-xs text-gray-500 border-t border-gray-200 mt-1">
            {{ 'common.welcome' | translate }}
          </div>
        </div>
      }
    </div>
  `,
  styles: [
    `
      @keyframes fade-in {
        from {
          opacity: 0;
          transform: translateY(-8px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .animate-fade-in {
        animation: fade-in 0.2s ease-out;
      }
    `
  ]
})
export class LanguageSwitcherComponent {
  readonly languageService = inject(LanguageService);
  isOpen = false;

  currentLangInfo() {
    return this.languageService.getCurrentLanguageInfo();
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  selectLanguage(lang: 'fr' | 'en') {
    this.languageService.switchLanguage(lang);
    this.isOpen = false;
  }
}
