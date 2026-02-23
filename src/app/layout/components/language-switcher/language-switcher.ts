import { Component, inject, HostListener } from '@angular/core';
import { LanguageService } from '../../../core/services/language';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule, ChevronDown, Check } from 'lucide-angular';

@Component({
  selector: 'app-language-switcher',
  imports: [TranslateModule, LucideAngularModule],
  templateUrl: './language-switcher.html'
})
export class LanguageSwitcherComponent {
  readonly languageService = inject(LanguageService);
  isOpen = false;

  icons = {
    chevronDown: ChevronDown,
    check: Check
  };

  currentLangInfo() {
    return this.languageService.getCurrentLanguageInfo();
  }

  toggleDropdown(event: MouseEvent) {
    event.stopPropagation();
    this.isOpen = !this.isOpen;
  }

  closeDropdown() {
    this.isOpen = false;
  }

  selectLanguage(lang: 'fr' | 'en') {
    this.languageService.switchLanguage(lang);
    this.closeDropdown();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const switcherButton = target.closest('.lang-switcher-button');
    const switcherDropdown = target.closest('.lang-switcher-dropdown');

    if (!switcherButton && !switcherDropdown && this.isOpen) {
      this.closeDropdown();
    }
  }
}
