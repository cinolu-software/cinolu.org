import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, RouterLink, NgOptimizedImage],
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  links = [
    {
      title: 'Découvrir',
      urls: [
        { name: 'Les programmes', path: '/programs', external: false },
        { name: 'Evénements', path: '/events', external: false }
      ]
    },
    {
      title: 'Socials',
      urls: [
        { name: 'Facebook', path: 'https://www.facebook.com/share/15cR36qNs8/?mibextid=kFxxJD', external: true },
        { name: 'Twitter', path: 'https://x.com/Lubumdigital?t=MYcaQ_OEdCO3KZDCQzMoeQ&s=09', external: true },
        { name: 'LinkedIn', path: 'https://www.linkedin.com/company/cinolu/', external: true }
      ]
    }
  ];

  getYear(): number {
    return new Date().getFullYear();
  }
}
