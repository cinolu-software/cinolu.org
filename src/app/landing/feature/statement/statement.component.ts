import { afterNextRender, Component, signal } from '@angular/core';
import { innovationEcosystems } from '../../utils/data/statements';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { owlOptionsStatements } from '../../utils/config/owl.config';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-statement',
  imports: [CarouselModule, NgOptimizedImage],
  templateUrl: './statement.component.html'
})
export class StatementComponent {
  innovationEcosystems = innovationEcosystems;
  slides: string[] = ['/images/about.jpg', '/images/blog.webp', '/images/events.jpg', '/images/hero.jpg'];
  isBrowser = signal<boolean>(false);
  owlOptions = owlOptionsStatements;

  constructor() {
    afterNextRender(() => {
      this.isBrowser.set(true);
    });
  }
}
