import { Component, inject, input } from '@angular/core';
import { team } from './team';
import { Location, NgOptimizedImage } from '@angular/common';
import { LucideAngularModule, ArrowLeft } from 'lucide-angular';

@Component({
  selector: 'app-auth-card',
  imports: [NgOptimizedImage, LucideAngularModule],
  templateUrl: './auth-card.component.html'
})
export class AuthCardComponent {
  title = input.required<string>();
  description = input.required<string>();
  team = team;
  #location = inject(Location);
  icons = {
    arrowLeft: ArrowLeft
  };

  back(): void {
    this.#location.back();
  }
}
