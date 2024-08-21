import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'home-team',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './team.component.html'
})
export class TeamComponent {
  team: { name: string; role: string; image: string }[] = [
    {
      name: 'Berry Numbi',
      role: 'Managing Director',
      image: '/images/team/bn.webp'
    },
    {
      name: 'Josue Vangu',
      role: 'Program Manager',
      image: '/images/team/jv.webp'
    },
    {
      name: 'Lydia Saku',
      role: 'Program Manager',
      image: '/images/team/ls.webp'
    },
    {
      name: 'Megan Madia',
      role: 'Support Manager',
      image: '/images/team/mm.webp'
    },
    {
      name: 'Rodriguez Monga',
      role: 'Event Manager',
      image: '/images/team/rm.webp'
    },
    {
      name: 'Wilfried Musanzi',
      role: 'Software Engineer',
      image: '/images/team/wm.webp'
    },
    {
      name: 'Moise Kalunga',
      role: 'Software Engineer',
      image: '/images/team/mk.webp'
    },
    {
      name: 'Joyce Mishika',
      role: 'Planning Manager',
      image: '/images/team/jm.webp'
    }
  ];
}
