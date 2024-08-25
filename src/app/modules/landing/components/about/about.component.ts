import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'landing-about',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './about.component.html'
})
export class AboutComponent {}