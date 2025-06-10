import { Component, input } from '@angular/core';
import { team } from './team';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, ArrowLeft } from 'lucide-angular';

@Component({
  selector: 'app-auth-card',
  imports: [NgOptimizedImage, LucideAngularModule, RouterLink],
  templateUrl: './auth-card.component.html',
})
export class AuthCardComponent {
  title = input.required<string>();
  description = input.required<string>();
  team = team;
  icons = {
    arrowLeft: ArrowLeft,
  };
}
