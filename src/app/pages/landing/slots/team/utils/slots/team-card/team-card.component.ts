import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';
import { ObserveVisibilityDirective } from '@core/directives/observer.directive';
import { IUser } from '../../../../../../../../@core/types/models.type';
import { environment } from '../../../../../../../../environments/environment';

@Component({
  selector: 'app-team-card',
  standalone: true,
  imports: [NgOptimizedImage, ObserveVisibilityDirective, CommonModule],
  templateUrl: './team-card.component.html'
})
export class TeamCardComponent {
  user = input.required<IUser>();

  displayProfileImage(user: IUser): string {
    return user.profile
      ? `${environment.apiUrl}uploads/profiles/${user.profile}`
      : user.google_image || '/images/avatar-default.webp';
  }
}
