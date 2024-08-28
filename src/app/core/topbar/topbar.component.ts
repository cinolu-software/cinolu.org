import { Component, HostListener, inject, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ILink } from './types/link.interface';
import { FormsModule } from '@angular/forms';
import { IUser } from '../types/models.interface';
import { selectUser } from '../auth/data-access/auth.reducers';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, RouterModule, NgOptimizedImage, FormsModule],
  templateUrl: './topbar.component.html'
})
export class TopbarComponent {
  user$: Observable<IUser | null>;
  isOpen = signal(false);
  private _store: Store = inject(Store);
  private _router: Router = inject(Router);

  constructor() {
    this.user$ = this._store.pipe(select(selectUser));
  }

  // Ajout de liens de navigation, programmes, evenements, services, nous rejoindre
  commonLinks: ILink[] = [
    {
      name: 'Accueil',
      path: '/'
    },
    {
      name: 'Services',
      path: '/services'
    }
  ];

  authLinks: ILink[] = [
    {
      name: 'Se connecter',
      path: '/sign-in'
    },
    {
      name: "S'inscrire",
      path: '/sign-up'
    }
  ];

  unAuthenticatedUserLinks: ILink[] = [...this.commonLinks, ...this.authLinks];

  toogleNav(): void {
    this.isOpen.update((isOpen) => !isOpen);
  }

  signOut(): void {
    this._router.navigate(['/sign-out']);
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const isNavbar = target.closest('.navbar');
    if (!isNavbar) this.isOpen.set(false);
  }
}
