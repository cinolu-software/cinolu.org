import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';
import { ObserveVisibilityDirective } from 'app/common/directives/observer.directive';
import { ImgPipe } from 'app/common/pipes/img.pipe';
import { IUser } from 'app/common/types/models.type';

@Component({
  selector: 'app-team-card',
  standalone: true,
  imports: [NgOptimizedImage, ObserveVisibilityDirective, CommonModule, ImgPipe],
  templateUrl: './team-card.component.html'
})
export class TeamCardComponent {
  user = input.required<IUser>();
}
