import { Directive, ElementRef, OnInit, Renderer2, PLATFORM_ID, OnDestroy, input, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appCountUp]',
  standalone: true
})
export class CountUpDirective implements OnInit, OnDestroy {
  end = input<number>(0);
  duration = input<number>(2000);
  suffix = input<string>('+');
  #observer: IntersectionObserver | null = null;
  #el = inject(ElementRef<HTMLElement>);
  #renderer = inject(Renderer2);
  #platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    if (!isPlatformBrowser(this.#platformId)) return;
    this.#observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.animateCount();
          this.#observer?.disconnect();
        }
      },
      { threshold: 0.6 }
    );
    this.#observer.observe(this.#el.nativeElement);
  }

  ngOnDestroy(): void {
    this.#observer?.disconnect();
  }

  private animateCount(): void {
    const start = 0;
    const range = this.end() - start;
    const frameRate = 1000 / 60;
    const totalFrames = this.duration() / frameRate;
    const increment = range / totalFrames;

    let current = start;

    const step = () => {
      current += increment;
      if (current < this.end()) {
        this.#renderer.setProperty(this.#el.nativeElement, 'innerText', Math.floor(current).toLocaleString());
        requestAnimationFrame(step);
      } else {
        this.#renderer.setProperty(
          this.#el.nativeElement,
          'innerText',
          `${this.end().toLocaleString()}${this.suffix()}`
        );
      }
    };
    requestAnimationFrame(step);
  }
}
