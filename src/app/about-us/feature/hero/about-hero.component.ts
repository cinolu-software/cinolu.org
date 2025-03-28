import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-about-hero',
  imports: [CommonModule, RouterModule],
  templateUrl: './about-hero.component.html'
})
export class AboutHeroComponent {}
