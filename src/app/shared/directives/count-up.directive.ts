import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCountUp]',
  standalone: true
})
export class CountUpDirective implements OnInit {
  @Input() end = 0;
  @Input() duration = 2000;
  @Input() suffix = '+';

  constructor(
    private el: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.animateCount();
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
