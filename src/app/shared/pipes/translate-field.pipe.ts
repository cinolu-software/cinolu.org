import { Pipe, PipeTransform, inject } from '@angular/core';
import { LanguageService } from '@core/services/language/language.service';

/**
 * Pipe pour traduire automatiquement les champs des objets venant de l'API
 * Usage: {{ program.name | translateField:'name':program }}
 *
 * Le pipe cherche automatiquement le champ traduit en fonction de la langue active.
 * Par exemple, si la langue est 'en', il cherchera 'name_en', 'description_en', etc.
 */
@Pipe({
  name: 'translateField',
  pure: false // Pour réagir aux changements de langue
})
export class TranslateFieldPipe implements PipeTransform {
  private languageService = inject(LanguageService);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform(value: string | null | undefined, fieldName?: string, obj?: any): string {
    if (!value) return '';

    const currentLang = this.languageService.currentLanguage();

    // Si la langue est le français (par défaut), retourner la valeur telle quelle
    if (currentLang === 'fr') {
      return value;
    }

    // Si un objet est fourni, chercher le champ traduit dans l'objet
    if (obj && fieldName) {
      const translatedField = `${fieldName}_${currentLang}`;
      const translatedValue = obj[translatedField];
      return (translatedValue as string) || value;
    }

    // Sinon, retourner la valeur par défaut
    return value;
  }
}
