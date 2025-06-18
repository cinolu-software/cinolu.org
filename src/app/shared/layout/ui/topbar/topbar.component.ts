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
import { DesktopNavComponent } from './desktop-nav/desktop-nav.component';
import { MobileNavComponent } from './mobile-nav/mobile-nav.component';
import { environment } from '../../../../../environments/environment';
import { EXPLORATION_LINKS, MY_CINOLU_LINKS } from '../../utils/data/links';
import { AuthStore } from '../../../store/auth.store';

@Component({
  selector: 'app-topbar',
  imports: [CommonModule, RouterLink, MobileNavComponent, DesktopNavComponent, NgOptimizedImage],
  templateUrl: './topbar.component.html'
})
export class TopbarComponent implements OnDestroy {
  #elementRef = inject(ElementRef);
  isFixed = signal(false);
  tabs = signal(['Parcourir', 'My Cinolu']);
  links = signal({
    Parcourir: EXPLORATION_LINKS,
    'My Cinolu': MY_CINOLU_LINKS
  });
  fixed = input(false);
  mobileNav = viewChild(MobileNavComponent);
  desktopNav = viewChild(DesktopNavComponent);
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
    this.desktopNav()?.closeNav();
    this.mobileNav()?.closeNav();
  }

  setupEventListeners(): void {
    const click$ = fromEvent(document, 'click');
    const scroll$ = fromEvent(window, 'scroll');
    click$.pipe(takeUntil(this.#destroy$)).subscribe((event: Event) => {
      const isInside = this.#elementRef.nativeElement.contains(event.target);
      const isMenuOpen = this.desktopNav()?.activeTab() || this.mobileNav()?.isOpen();
      if (isMenuOpen && !isInside) this.closeNav();
    });
    scroll$.pipe(takeUntil(this.#destroy$)).subscribe(() => {
      const shouldFix = window.scrollY > 20;
      if (this.isFixed() !== shouldFix) this.isFixed.set(shouldFix);
      if (this.desktopNav()?.activeTab() || this.mobileNav()?.isOpen()) this.closeNav();
    });
  }

  ngOnDestroy(): void {
    this.#destroy$.next();
    this.#destroy$.complete();
  }
}
