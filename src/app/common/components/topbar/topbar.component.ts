import { Component, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ILink } from './types/link.interface';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { IUser } from '../../types/models.type';
import { environment } from 'environments/environment';
import { AuthService } from '../../../pages/auth/auth.service';
import { QueryObserverResult } from '@ngneat/query';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, RouterModule, NgOptimizedImage, FormsModule],
  templateUrl: './topbar.component.html'
})
export class TopbarComponent {
  profile$: Observable<QueryObserverResult<IUser, Error>>;
  accountUrl: string;
  private _authService = inject(AuthService);

  links: ILink[] = [
    {
      name: 'Se connecter',
      path: '/sign-in'
    },
    {
      name: "S'inscrire",
      path: '/sign-up'
    }
  ];

  constructor() {
    this.accountUrl = environment.accountUrl;
    this.profile$ = this._authService.getProfile();
  }

  displayProfileImage(user: IUser): string {
    return user.profile
      ? `${environment.accountUrl}uploads/profiles/${user.profile}`
      : user.google_image || '/images/avatar-default.webp';
  }
}
