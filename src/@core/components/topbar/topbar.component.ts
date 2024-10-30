import { Component, HostListener, inject, OnInit, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { IUser } from '@core/types/models.type';
import { ILink } from './types/link.type';
import { environment } from 'environments/environment';
import { selectUser } from '@core/store/app.reducers';
import { ImgPipe } from '../../pipes/img.pipe';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, RouterModule, NgOptimizedImage, FormsModule, ImgPipe],
  templateUrl: './topbar.component.html'
})
export class TopbarComponent implements OnInit {
  user$: Observable<IUser | null>;
  isOpen = signal(false);
  accountUrl = environment.accountUrl;
  #store = inject(Store);

  ngOnInit(): void {
    this.user$ = this.#store.pipe(select(selectUser));
  }

  commonLinks: ILink[] = [
    {
      name: 'Programmes',
      path: '/programs'
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

  trimName(name: string): string {
    return name.length > 15 ? name.substring(0, 15) + '...' : name;
  }

  toogleMenu(): void {
    this.isOpen.update((value) => !value);
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const isNavbar = target.closest('.navbar');
    if (!isNavbar) this.isOpen.set(false);
  }
}
