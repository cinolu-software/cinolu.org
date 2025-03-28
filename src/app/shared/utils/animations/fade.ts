import { animate, query, stagger, style, transition, trigger } from '@angular/animations';

export const fadeInStagger = trigger('fadeInStagger', [
  transition(':enter', [
    query('.fade-item', [
      style({ opacity: 0, transform: 'translateY(20px)' }),
      stagger(150, [animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))])
    ])
  ])
]);
