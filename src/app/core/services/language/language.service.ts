import { Injectable, signal, effect, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

export type Language = 'fr' | 'en';

export interface LanguageOption {
  code: Language;
  name: string;
  flag: string;
}

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private readonly STORAGE_KEY = 'cinolu_language';
  private readonly translate = inject(TranslateService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  // Signal pour la langue courante
  currentLanguage = signal<Language>('fr');

  // Langues disponibles
  readonly availableLanguages: LanguageOption[] = [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'en', name: 'English', flag: '🇬🇧' }
  ];

  constructor() {
    // Récupérer la langue sauvegardée ou utiliser la langue par défaut
    const savedLang = this.getSavedLanguage();
    this.setLanguage(savedLang);

    // Persister la langue à chaque changement (seulement côté navigateur)
    if (this.isBrowser) {
      effect(() => {
        const lang = this.currentLanguage();
        localStorage.setItem(this.STORAGE_KEY, lang);
      });
    }
  }

  /**
   * Définir la langue active
   */
  setLanguage(lang: Language): void {
    console.log('🌐 Setting language to:', lang);
    this.translate.use(lang);
    this.currentLanguage.set(lang);

    // Mettre à jour l'attribut lang du document HTML (seulement côté navigateur)
    if (this.isBrowser && typeof document !== 'undefined') {
      document.documentElement.lang = lang;
      console.log('✅ Language set successfully:', lang);
    }
  }

  /**
   * Changer de langue
   */
  switchLanguage(lang: Language): void {
    this.setLanguage(lang);
  }

  /**
   * Basculer entre les langues disponibles
   */
  toggleLanguage(): void {
    const currentLang = this.currentLanguage();
    const newLang: Language = currentLang === 'fr' ? 'en' : 'fr';
    this.setLanguage(newLang);
  }

  /**
   * Récupérer la langue sauvegardée
   */
  private getSavedLanguage(): Language {
    // Seulement côté navigateur
    if (this.isBrowser && typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (saved === 'fr' || saved === 'en') {
        return saved;
      }
    }

    // Détection de la langue du navigateur (seulement côté navigateur)
    if (this.isBrowser && typeof navigator !== 'undefined') {
      const browserLang = navigator.language.split('-')[0];
      if (browserLang === 'fr' || browserLang === 'en') {
        return browserLang;
      }
    }

    return 'fr'; // Langue par défaut
  }

  /**
   * Obtenir les informations de la langue courante
   */
  getCurrentLanguageInfo(): LanguageOption {
    const lang = this.currentLanguage();
    return this.availableLanguages.find((l) => l.code === lang) || this.availableLanguages[0];
  }

  /**
   * Traduction instantanée
   */
  instant(key: string, params?: object): string {
    return this.translate.instant(key, params);
  }
}
