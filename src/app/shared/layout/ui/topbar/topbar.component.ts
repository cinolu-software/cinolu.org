import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { IUser } from 'app/shared/utils/types/models.type';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { selectUser } from 'app/shared/store/auth/auth.reducers';
import { AuthService } from 'app/auth/data-access/auth.service';
import { IAPIResponse } from 'app/shared/services/api/types/api-response.type';
import { environment } from 'environments/environment';
import { EXPLORATION_LINKS, MY_CINOLU_LINKS } from '../../utils/data/links';
import { ILink } from '../../utils/types/link.type';
import { DesktopNavComponent } from './desktop-nav/desktop-nav.component';
import { MobileNavComponent } from './mobile-nav/mobile-nav.component';

@Component({
  selector: 'app-topbar',
  host: { '(window:scroll)': 'onWindowScroll()' },
  imports: [CommonModule, NgOptimizedImage, MobileNavComponent, DesktopNavComponent],
  templateUrl: './topbar.component.html'
})
export class TopbarComponent implements OnInit {
  #store = inject(Store);
  #authService = inject(AuthService);
  user$: Observable<IUser>;
  logout$: Observable<IAPIResponse<void>>;
  accUrl = environment.accountUrl;
  isFixed = signal<boolean>(false);
  tabs = signal<string[]>(['Parcourir', 'My cinolu']);
  links = signal<Record<string, ILink[]>>({
    Parcourir: EXPLORATION_LINKS,
    'My cinolu': MY_CINOLU_LINKS
  });

  ngOnInit(): void {
    this.user$ = this.#store.pipe(select(selectUser));
  }

  signOut(): void {
    this.logout$ = this.#authService.signOut();
  }

  onWindowScroll(): void {
    this.isFixed.set(window.scrollY > 50);
  }
}
