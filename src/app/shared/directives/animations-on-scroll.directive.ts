import { afterNextRender, Directive, ElementRef, inject, Renderer2, OnDestroy, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appAnimationsOnScroll]'
})
export class FadeInOnScrollDirective implements OnDestroy {
  #el = inject(ElementRef);
  #renderer = inject(Renderer2);
  #platformId = inject(PLATFORM_ID);
  #observer: IntersectionObserver | null = null;

  constructor() {
    // Ne pas exécuter côté serveur
    if (!isPlatformBrowser(this.#platformId)) return;

    afterNextRender(() => {
      this.initStyles();

      // Options optimisées pour réduire les vérifications
      const options: IntersectionObserverInit = {
        threshold: 0.1,
        rootMargin: '50px' // Déclencher 50px avant d'être visible
      };

      this.#observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Utiliser requestAnimationFrame pour optimiser le rendering
            requestAnimationFrame(() => {
              this.#renderer.addClass(this.#el.nativeElement, 'animate-slide-in');
            });
            // Déconnecter immédiatement après l'animation
            this.#observer?.unobserve(this.#el.nativeElement);
          }
        });
      }, options);

      this.#observer.observe(this.#el.nativeElement);
    });
  }

  private initStyles(): void {
    this.#renderer.addClass(this.#el.nativeElement, 'duration-1000');
  }

  ngOnDestroy(): void {
    // Nettoyer l'observer pour éviter les fuites mémoire
    this.#observer?.disconnect();
    this.#observer = null;
  }
}
