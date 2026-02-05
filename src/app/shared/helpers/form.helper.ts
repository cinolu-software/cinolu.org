import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

export function isRequired(control: AbstractControl | null): boolean {
  if (!control) return false;
  const validator = control.validator?.({} as AbstractControl);
  return !!(validator && validator['required']);
}

export function shouldShowError(control: AbstractControl | null): boolean {
  if (!control) return false;
  return control.invalid && (control.dirty || control.touched);
}

export function getErrorMessage(control: AbstractControl | null, customMessages?: Record<string, string>): string {
  if (!control || !control.errors) return '';

  const errors: ValidationErrors = control.errors;
  const errorKey = Object.keys(errors)[0];

  if (customMessages && customMessages[errorKey]) {
    return customMessages[errorKey];
  }

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

export function markAllAsTouched(form: FormGroup): void {
  Object.keys(form.controls).forEach((key) => {
    const control = form.controls[key];
    control.markAsTouched();
    if ((control as unknown as { controls?: Record<string, AbstractControl> }).controls) {
      markAllAsTouched(control as FormGroup);
    }
  });
}

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
