import { AfterViewInit, Directive, ElementRef, input, Input } from '@angular/core';
import { SwiperContainer } from 'swiper/element';
import { SwiperOptions } from 'swiper/types';

@Directive({
  selector: '[appSwiper]',
  standalone: true
})
export class SwiperDirective implements AfterViewInit {
  config = input<SwiperOptions>({});

  constructor(private el: ElementRef<SwiperContainer>) {}

  ngAfterViewInit(): void {
    Object.assign(this.el.nativeElement, this.config);

    this.el.nativeElement.initialize();
  }
}
