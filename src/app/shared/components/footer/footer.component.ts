import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { EXPLORATION_LINKS, MY_CINOLU_LINKS, SOCIAL_LINKS } from '../../data/links.data';
import { LucideAngularModule, ArrowUpRight, ChevronRight } from 'lucide-angular';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, NgOptimizedImage, LucideAngularModule],
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  links = [
    { title: 'Parcourir', urls: EXPLORATION_LINKS },
    { title: 'My Cinolu', urls: MY_CINOLU_LINKS },
    { title: 'Socials', urls: SOCIAL_LINKS }
  ];
  icons = {
    arrowUpRight: ChevronRight,
    arrowRight: ArrowUpRight
  };

  getYear(): number {
    return new Date().getFullYear();
  }
}
