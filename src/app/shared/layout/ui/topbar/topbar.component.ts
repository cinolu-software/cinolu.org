import { Component, ElementRef, inject, input, OnDestroy, OnInit, signal, viewChild } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { IUser } from 'app/shared/utils/types/models.type';
import { Observable, Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { selectUser } from 'app/shared/store/auth/auth.reducers';
import { ILink } from '../../utils/types/link.type';
import { AuthService } from '../../../../auth/data-access/auth.service';
import { IAPIResponse } from '../../../services/api/types/api-response.type';
import { EXPLORATION_LINKS, MY_CINOLU_LINKS } from '../../utils/data/links';
import { environment } from 'environments/environment';
import { DesktopNavComponent } from './desktop-nav/desktop-nav.component';
import { MobileNavComponent } from './mobile-nav/mobile-nav.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-topbar',
  host: { '(document:click)': 'onClickOutside($event)', '(window:scroll)': 'onWindowScroll()' },
  imports: [CommonModule, RouterLink, MobileNavComponent, DesktopNavComponent, NgOptimizedImage],
  templateUrl: './topbar.component.html'
})
export class TopbarComponent implements OnInit, OnDestroy {
  #store = inject(Store);
  #authService = inject(AuthService);
  user$: Observable<IUser>;
  logout$: Observable<IAPIResponse<void>>;
  accUrl = environment.accountUrl;
  tabs = signal<string[]>(['Parcourir', 'My Cinolu']);
  isFixed = signal<boolean>(false);
  fixed = input<boolean>(false);
  mobileNav = viewChild(MobileNavComponent);
  desktopNav = viewChild(DesktopNavComponent);
  elementRef = inject(ElementRef);
  subscription: Subscription;
  links = signal<Record<string, ILink[]>>({
    Parcourir: EXPLORATION_LINKS,
    'My Cinolu': MY_CINOLU_LINKS
  });

  ngOnInit(): void {
    this.user$ = this.#store.pipe(select(selectUser));
  }

  signOut(): void {
    this.subscription = this.#authService.signOut().subscribe();
  }

  closeNav(): void {
    this.desktopNav()?.closeNav();
    this.mobileNav()?.closeNav();
  }

  onClickOutside(event: Event) {
    if (
      (this.desktopNav()?.activeTab() || this.mobileNav()?.isOpen()) &&
      !this.elementRef.nativeElement.contains(event.target)
    ) {
      this.closeNav();
    }
  }

  onWindowScroll(): void {
    this.isFixed.set(window.scrollY > 30);
    if (this.desktopNav()?.activeTab() || this.mobileNav()?.isOpen()) this.closeNav();
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
