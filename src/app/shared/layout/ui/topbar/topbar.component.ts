import { Component, ElementRef, inject, OnInit, signal, viewChild } from '@angular/core';
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
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-topbar',
  host: {
    '(window:scroll)': 'onWindowScroll()',
    '(document:click)': 'onClickOutside($event)'
  },
  imports: [CommonModule, RouterLink, NgOptimizedImage, MobileNavComponent, DesktopNavComponent],
  templateUrl: './topbar.component.html'
})
export class TopbarComponent implements OnInit {
  #store = inject(Store);
  #authService = inject(AuthService);
  user$: Observable<IUser>;
  logout$: Observable<IAPIResponse<void>>;
  accUrl = environment.accountUrl;
  tabs = signal<string[]>(['Parcourir', 'My cinolu']);
  desktopNav = viewChild(DesktopNavComponent);
  mobileNav = viewChild(MobileNavComponent);
  elementRef = inject(ElementRef);
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

  closeNav(): void {
    this.desktopNav()?.closeNav();
    this.mobileNav()?.closeNav();
  }

  onWindowScroll(): void {
    this.closeNav();
  }

  onClickOutside(event: Event) {
    if (
      (this.desktopNav()?.activeTab() || this.mobileNav()?.isOpen()) &&
      !this.elementRef.nativeElement.contains(event.target)
    ) {
      this.closeNav();
    }
  }
}
