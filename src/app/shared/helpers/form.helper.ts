import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

/**
 * Vérifie si un control a le validator `Validators.required`.
 */
export function isRequired(control: AbstractControl | null): boolean {
  if (!control) return false;
  const validator = control.validator?.({} as AbstractControl);
  return !!(validator && validator['required']);
}

/**
 * Détermine si on doit afficher une erreur (invalid + (dirty OU touched)).
 */
export function shouldShowError(control: AbstractControl | null): boolean {
  if (!control) return false;
  return control.invalid && (control.dirty || control.touched);
}

/**
 * Retourne le premier message d'erreur pour un control donné.
 * @param control - le FormControl
 * @param customMessages - map optionnelle { errorKey: message }
 */
export function getErrorMessage(control: AbstractControl | null, customMessages?: Record<string, string>): string {
  if (!control || !control.errors) return '';

  const errors: ValidationErrors = control.errors;
  const errorKey = Object.keys(errors)[0];

  if (customMessages && customMessages[errorKey]) {
    return customMessages[errorKey];
  }

  // Messages par défaut
  switch (errorKey) {
    case 'required':
      return 'Ce champ est requis';
    case 'email':
      return 'Email invalide';
    case 'minlength':
      return `Minimum ${errors[errorKey]?.requiredLength} caractères`;
    case 'maxlength':
      return `Maximum ${errors[errorKey]?.requiredLength} caractères`;
    case 'min':
      return `Valeur minimum: ${errors[errorKey]?.min}`;
    case 'max':
      return `Valeur maximum: ${errors[errorKey]?.max}`;
    case 'pattern':
      return 'Format invalide';
    default:
      return 'Erreur de validation';
  }
}

/**
 * Marque tous les controls d'un FormGroup comme touched (pour déclencher les erreurs).
 */
export function markAllAsTouched(form: FormGroup): void {
  Object.keys(form.controls).forEach((key) => {
    const control = form.controls[key];
    control.markAsTouched();
    if ((control as unknown as { controls?: Record<string, AbstractControl> }).controls) {
      markAllAsTouched(control as FormGroup);
    }
  });
}

/**
 * Compte le nombre total de controls dans un FormGroup (récursif).
 */
export function countControls(group: FormGroup): number {
  let count = 0;
  for (const key of Object.keys(group.controls)) {
    const c = group.controls[key];
    const maybeGroup = c as unknown as { controls?: Record<string, unknown> };
    if (maybeGroup.controls && typeof maybeGroup.controls === 'object') {
      count += countControls(c as FormGroup);
    } else {
      count += 1;
    }
  }
  return count;
}

/**
 * Compte le nombre de controls valides dans un FormGroup (récursif).
 */
export function countValidControls(group: FormGroup): number {
  let count = 0;
  for (const key of Object.keys(group.controls)) {
    const c = group.controls[key];
    const maybeGroup = c as unknown as { controls?: Record<string, unknown> };
    if (maybeGroup.controls && typeof maybeGroup.controls === 'object') {
      count += countValidControls(c as FormGroup);
    } else {
      if (!c.disabled && c.valid) count += 1;
    }
  }
  return count;
}
