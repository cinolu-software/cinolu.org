import { Component, input } from '@angular/core';
import { team } from 'app/pages/auth/slots/auth-card/team';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-auth-card',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './auth-card.component.html'
})
export class AuthCardComponent {
  team = team;
  title = input.required<string>();
  description = input.required<string>();
}
