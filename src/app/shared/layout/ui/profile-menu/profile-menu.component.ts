import {
  afterNextRender,
  Component,
  ElementRef,
  inject,
  input,
  NgZone,
  OnDestroy,
  signal,
  viewChild
} from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { fromEvent, Subject, takeUntil } from 'rxjs';
import { RouterLink } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { EXPLORATION_LINKS, PROFILE_LINKS } from '../../utils/data/links';
import { AuthStore } from '../../../store/auth.store';
import { DesktopProfileMenuComponent } from './desktop-menu/desktop-profile-menu.component';
import { MobileProfileMenuComponent } from './mobile-menu/mobile-profile-menu.component';

@Component({
  selector: 'app-profile-menu',
  imports: [CommonModule, RouterLink, DesktopProfileMenuComponent, MobileProfileMenuComponent, NgOptimizedImage],
  templateUrl: './profile-menu.component.html'
})
export class ProfileMenuComponent implements OnDestroy {
  #elementRef = inject(ElementRef);
  isFixed = signal(false);
  tabs = signal(['Parcourir']);
  desktopLinks = signal({
    Parcourir: EXPLORATION_LINKS
  });
  mobileLinks = signal(PROFILE_LINKS);
  fixed = input(false);
  mobileNav = viewChild(MobileProfileMenuComponent);
  desktopNav = viewChild(DesktopProfileMenuComponent);
  #destroy$ = new Subject<void>();
  #ngZone = inject(NgZone);
  accountUrl = environment.accountUrl;
  authStore = inject(AuthStore);

  constructor() {
    afterNextRender(() => {
      this.#ngZone.runOutsideAngular(() => {
        this.setupEventListeners();
      });
    });
  }

  signOut(): void {
    this.authStore.signOut();
  }

  closeNav(): void {
    this.mobileNav()?.closeNav();
  }

  setupEventListeners(): void {
    const click$ = fromEvent(document, 'click');
    const scroll$ = fromEvent(window, 'scroll');
    click$.pipe(takeUntil(this.#destroy$)).subscribe((event: Event) => {
      const isInside = this.#elementRef.nativeElement.contains(event.target);
      const isMenuOpen = this.mobileNav()?.isOpen();
      if (isMenuOpen && !isInside) this.closeNav();
    });
    scroll$.pipe(takeUntil(this.#destroy$)).subscribe(() => {
      const shouldFix = window.scrollY > 20;
      if (this.isFixed() !== shouldFix) this.isFixed.set(shouldFix);
      if (this.mobileNav()?.isOpen()) this.closeNav();
    });
  }

  ngOnDestroy(): void {
    this.#destroy$.next();
    this.#destroy$.complete();
  }
}
