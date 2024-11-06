import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage],
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  links: { title: string; urls: { name: string; path: string }[] }[] = [
    {
      title: 'Découvrir',
      urls: [
        { name: 'Les programmes', path: '/' },
        { name: 'Evénements', path: '/' }
      ]
    },
    {
      title: 'À propos de',
      urls: [
        { name: 'Notre équipe', path: '/#team' },
        { name: 'Blog', path: '/' }
      ]
    },
    {
      title: 'Aide',
      urls: [
        { name: 'Outils de demande', path: '/' },
        { name: "Conditions d'utilisation", path: '/' },
        { name: 'Avis de non-responsabilité', path: '/' },
        { name: 'Lignes directrices', path: '/' }
      ]
    },
    {
      title: 'Socials',
      urls: [
        { name: 'Facebook', path: '/' },
        { name: 'Twitter', path: '/' },
        { name: 'LinkedIn', path: '/' }
      ]
    }
  ];

  getYear(): number {
    return new Date().getFullYear();
  }
}
