import { Component, input } from '@angular/core';
import { team } from './team';
import { NgOptimizedImage } from '@angular/common';
import { TopbarComponent } from '../../../../common/components/topbar/topbar.component';

@Component({
  selector: 'app-auth-card',
  standalone: true,
  imports: [NgOptimizedImage, TopbarComponent],
  templateUrl: './auth-card.component.html'
})
export class AuthCardComponent {
  team = team;
  title = input.required<string>();
  description = input.required<string>();
}
