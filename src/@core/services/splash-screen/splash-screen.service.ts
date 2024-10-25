import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, take } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SplashScreenService {
  #document = inject(DOCUMENT);
  #router = inject(Router);

  constructor() {
    this.show();
    this.#router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        take(1)
      )
      .subscribe(() => {
        this.hide();
      });
  }

  show(): void {
    this.#document.body.classList.remove('app-splash-screen-hidden');
  }

  hide(): void {
    this.#document.body.classList.add('app-splash-screen-hidden');
  }
}
