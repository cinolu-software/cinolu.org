import {
  afterNextRender,
  Directive,
  ElementRef,
  inject,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appAnimationsOnScroll]',
})
export class FadeInOnScrollDirective {
  #el = inject(ElementRef);
  #renderer = inject(Renderer2);

  constructor() {
    afterNextRender(() => {
      this.initStyles();
      const observer = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.#renderer.addClass(
                this.#el.nativeElement,
                'animate-slide-in',
              );
              observer.unobserve(this.#el.nativeElement);
            }
          });
        },
        { threshold: 0.1 },
      );
      observer.observe(this.#el.nativeElement);
    });
  }

  private initStyles(): void {
    // this.#renderer.addClass(this.#el.nativeElement, 'opacity-0');
    // this.#renderer.addClass(this.#el.nativeElement, 'translate-x-[-50px]');
    // this.#renderer.addClass(this.#el.nativeElement, 'transition-all');
    this.#renderer.addClass(this.#el.nativeElement, 'duration-1000');
  }
}
