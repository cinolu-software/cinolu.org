import { Directive, ElementRef, Input, OnInit, Renderer2, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appCountUp]',
  standalone: true
})
export class CountUpDirective implements OnInit, OnDestroy {
  @Input() end = 0;
  @Input() duration = 2000;
  @Input() suffix = '+';

  private observer: IntersectionObserver | null = null;

  constructor(
    private el: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.animateCount();
          this.observer?.disconnect();
        }
      },
      { threshold: 0.6 }
    );

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private animateCount(): void {
    const start = 0;
    const range = this.end - start;
    const frameRate = 1000 / 60;
    const totalFrames = this.duration / frameRate;
    const increment = range / totalFrames;

    let current = start;

    const step = () => {
      current += increment;
      if (current < this.end) {
        this.renderer.setProperty(this.el.nativeElement, 'innerText', Math.floor(current).toLocaleString());
        requestAnimationFrame(step);
      } else {
        this.renderer.setProperty(this.el.nativeElement, 'innerText', `${this.end.toLocaleString()}${this.suffix}`);
      }
    };

    requestAnimationFrame(step);
  }
}
