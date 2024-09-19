import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { team } from '../../data/team';
import { ObserveVisibilityDirective } from 'app/core/directives/observer.directive';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'landing-team',
  standalone: true,
  imports: [NgOptimizedImage, ObserveVisibilityDirective, MatIconModule, CommonModule],
  templateUrl: './team.component.html'
})
export class TeamComponent {
  team = team;
  currentSmSlide = 0;
  currentMdSlide = 3;
  currentLgSlide = 6;

  prevSmSlide() {
    this.currentSmSlide = this.currentSmSlide === 0 ? this.team.length - 1 : this.currentSmSlide - 1;
  }

  nextSmSlide() {
    this.currentSmSlide = this.currentSmSlide === this.team.length - 1 ? 0 : this.currentSmSlide + 1;
  }

  prevMdSlide() {
    this.currentMdSlide = this.currentMdSlide === 0 ? this.team.length - 1 : this.currentMdSlide - 1;
  }

  nextMdSlide() {
    this.currentMdSlide = this.currentMdSlide === this.team.length - 1 ? 0 : this.currentMdSlide + 1;
  }

  prevLgSlide() {
    this.currentLgSlide = this.currentLgSlide === 0 ? this.team.length - 1 : this.currentLgSlide - 1;
  }

  nextLgSlide() {
    this.currentLgSlide = this.currentLgSlide === this.team.length - 1 ? 0 : this.currentLgSlide + 1;
  }
}
