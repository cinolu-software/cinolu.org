import { afterNextRender, Component, HostListener, inject, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ILink } from './types/link.interface';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { IUser } from '../../types/models.interface';
import { select, Store } from '@ngrx/store';
import { selectUser } from '../../store/app.reducers';
import { environment } from 'environments/environment';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, RouterModule, NgOptimizedImage, FormsModule],
  templateUrl: './topbar.component.html'
})
export class TopbarComponent {
  user$: Observable<IUser | null>;
  isOpen = signal(false);
  accountUrl: string;
  private _store = inject(Store);
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
    this.user$ = this._store.pipe(select(selectUser));
    this.accountUrl = environment.accountUrl + 'sign-in?token=' + this._authService.token;
  }

  displayProfileImage(user: IUser): string {
    return user.profile
      ? `${environment.accountUrl}uploads/profiles/${user.profile}`
      : user.google_image || '/images/avatar-default.webp';
  }

  toogleNav(): void {
    this.isOpen.update((isOpen) => !isOpen);
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const isNavbar = target.closest('.navbar');
    if (!isNavbar) this.isOpen.set(false);
  }
}
