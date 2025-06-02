import { Component, input } from '@angular/core';
import { team } from './team';
import { NgOptimizedImage } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-auth-card',
  imports: [NgOptimizedImage, NgIcon, RouterLink],
  templateUrl: './auth-card.component.html',
})
export class AuthCardComponent {
  title = input.required<string>();
  description = input.required<string>();
  team = team;
}
