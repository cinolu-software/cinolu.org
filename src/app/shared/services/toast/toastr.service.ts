import { afterNextRender, Injectable } from '@angular/core';
import { Notyf } from 'notyf';

@Injectable({
  providedIn: 'root'
})
export class ToastrService {
  #notyf: Notyf | null = null;

  constructor() {
    afterNextRender(() => {
      this.#notyf = new Notyf({
        duration: 4000,
        position: { x: 'right', y: 'top' }
      });
    });
  }

  showSuccess(message: string): void {
    this.#notyf?.success(message);
  }

  showError(message: string): void {
    this.#notyf?.error(message);
  }
}
