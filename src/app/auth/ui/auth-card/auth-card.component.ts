import { Component, input } from '@angular/core';
import { team } from './team';
import { NgOptimizedImage } from '@angular/common';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'app-auth-card',
  imports: [NgOptimizedImage, TranslocoDirective],
  templateUrl: './auth-card.component.html'
})
export class AuthCardComponent {
  team = team;
  title = input.required<string>();
  description = input.required<string>();
}
