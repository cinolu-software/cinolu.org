import { Component, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ILink } from './types/link.type';
import { FormsModule } from '@angular/forms';
import { IUser } from '../../types/models.type';
import { environment } from 'environments/environment';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectUser } from '../../store/app.reducers';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, RouterModule, NgOptimizedImage, FormsModule],
  templateUrl: './topbar.component.html'
})
export class TopbarComponent {
  #store = inject(Store);
  user$: Observable<IUser | null>;
  accountUrl: string;

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
    this.user$ = this.#store.pipe(select(selectUser));
  }

  displayProfileImage(user: IUser): string {
    return user.profile
      ? `${environment.accountUrl}uploads/profiles/${user.profile}`
      : user.google_image || '/images/avatar-default.webp';
  }
}
