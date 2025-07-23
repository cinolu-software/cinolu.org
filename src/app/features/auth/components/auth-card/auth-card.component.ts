import { Component, inject, input } from '@angular/core';
import { TEAM } from '../../data/team.data';
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
  team = TEAM;
  #location = inject(Location);
  icons = { arrowLeft: ArrowLeft };

  onGoBack(): void {
    this.#location.back();
  }
}
