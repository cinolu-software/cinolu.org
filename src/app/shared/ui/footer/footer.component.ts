import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { explorationLinks, myCinoluLinks, socialLinks } from '../../utils/data/links';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, RouterLink, NgOptimizedImage],
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  links = [
    { title: 'Parcourir', urls: explorationLinks },
    { title: 'My cinolu', urls: myCinoluLinks },
    { title: 'Socials', urls: socialLinks }
  ];

  getYear(): number {
    return new Date().getFullYear();
  }
}
