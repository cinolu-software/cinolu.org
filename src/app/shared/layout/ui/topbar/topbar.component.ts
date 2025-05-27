import { Component, ElementRef, inject, input, OnDestroy, OnInit, signal, viewChild } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Observable, Subject, takeUntil } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { ILink } from '../../utils/types/link.type';
import { AuthService } from '../../../../auth/data-access/auth.service';
import { IAPIResponse } from '../../../services/api/types/api-response.type';
import { DesktopNavComponent } from './desktop-nav/desktop-nav.component';
import { MobileNavComponent } from './mobile-nav/mobile-nav.component';
import { RouterLink } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { selectUser } from '../../../store/auth/auth.reducers';
import { IUser } from '../../../utils/types/models.type';
import { EXPLORATION_LINKS, MY_CINOLU_LINKS } from '../../utils/data/links';

@Component({
  selector: 'app-topbar',
  host: { '(document:click)': 'onClickOutside($event)', '(window:scroll)': 'onWindowScroll()' },
  imports: [CommonModule, RouterLink, MobileNavComponent, DesktopNavComponent, NgOptimizedImage],
  templateUrl: './topbar.component.html',
})
export class TopbarComponent implements OnInit, OnDestroy {
  #store = inject(Store);
  #authService = inject(AuthService);
  user$: Observable<IUser | null> | undefined;
  logout$: Observable<IAPIResponse<void>> | undefined;
  tabs = signal<string[]>(['Parcourir', 'My Cinolu']);
  isFixed = signal<boolean>(false);
  fixed = input<boolean>(false);
  mobileNav = viewChild(MobileNavComponent);
  desktopNav = viewChild(DesktopNavComponent);
  elementRef = inject(ElementRef);
  #unSubscribe = new Subject();
  accountUrl = environment.accountUrl;
  links = signal<Record<string, ILink[]>>({
    Parcourir: EXPLORATION_LINKS,
    'My Cinolu': MY_CINOLU_LINKS,
  });

  ngOnInit(): void {
    this.user$ = this.#store.pipe(select(selectUser));
  }

  signOut(): void {
    this.#authService.signOut().pipe(takeUntil(this.#unSubscribe)).subscribe();
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
    this.#unSubscribe.next(null);
    this.#unSubscribe.complete();
  }
}
