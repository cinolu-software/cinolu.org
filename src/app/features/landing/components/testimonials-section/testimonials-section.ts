import { Component, OnInit, signal } from '@angular/core';
import { TestimonialCard } from './testimonial-card/testimonial-card';
import { TESTIMONIALS } from '@features/landing/data/testimonials.data';

@Component({
  selector: 'app-testimonials',
  imports: [TestimonialCard],
  templateUrl: './testimonials-section.html'
})
export class TestimonialsSection implements OnInit {
  testimonials = TESTIMONIALS;
  activeTestimonial = signal(0);

  ngOnInit(): void {
    setInterval(() => {
      this.activeTestimonial.update((current) => (current + 1) % this.testimonials.length);
    }, 5000);
  }

  setActiveTestimonial(index: number): void {
    this.activeTestimonial.set(index);
  }
}
