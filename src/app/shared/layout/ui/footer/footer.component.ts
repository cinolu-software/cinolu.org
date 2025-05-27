import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { EXPLORATION_LINKS, MY_CINOLU_LINKS, SOCIAL_LINKS } from '../../utils/data/links';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, NgOptimizedImage, NgIcon],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  links = [
    { title: 'Parcourir', urls: EXPLORATION_LINKS },
    { title: 'My Cinolu', urls: MY_CINOLU_LINKS },
    { title: 'Socials', urls: SOCIAL_LINKS },
  ];

  getYear(): number {
    return new Date().getFullYear();
  }
}
