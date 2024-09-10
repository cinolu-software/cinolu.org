import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { team } from '../../data/team';

@Component({
  selector: 'landing-team',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './team.component.html'
})
export class TeamComponent {
  team = team;
}
