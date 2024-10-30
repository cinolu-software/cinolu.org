import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';
import { ObserveVisibilityDirective } from '@core/directives/observer.directive';
import { ImgPipe } from '@core/pipes/img.pipe';
import { IUser } from '@core/types/models.type';

@Component({
  selector: 'app-team-card',
  standalone: true,
  imports: [NgOptimizedImage, ObserveVisibilityDirective, CommonModule, ImgPipe],
  templateUrl: './team-card.component.html'
})
export class TeamCardComponent {
  user = input.required<IUser>();
}
