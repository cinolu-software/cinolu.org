import {
  afterNextRender,
  Component,
  ElementRef,
  inject,
  input,
  NgZone,
  OnDestroy,
  signal,
  viewChild,
} from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { fromEvent, Subject, takeUntil } from 'rxjs';
import { EXPLORATION_LINKS } from '../../data/links.data';
import { DesktopNav } from './desktop-nav/desktop-nav';
import { MobileNav } from './mobile-nav/mobile-nav';
import { RouterLink } from '@angular/router';
import { AuthStore } from '../../../core/auth/auth.store';
import { ChevronDown, LucideAngularModule } from 'lucide-angular';
import { ApiImgPipe } from '../../../shared/pipes/api-img.pipe';

@Component({
  selector: 'app-topbar',
  imports: [
    CommonModule,
    NgOptimizedImage,
    RouterLink,
    MobileNav,
    DesktopNav,
    LucideAngularModule,
    ApiImgPipe,
    NgOptimizedImage,
  ],
  templateUrl: './app-topbar.html',
})
export class AppTopbar implements OnDestroy {
  #elementRef = inject(ElementRef);
  isFixed = signal(false);
  links = signal(EXPLORATION_LINKS);
  fixed = input(false);
  mobileNav = viewChild(MobileNav);
  #destroy$ = new Subject<void>();
  #ngZone = inject(NgZone);
  authStore = inject(AuthStore);

  icons = { chevronRight: ChevronDown };

  constructor() {
    afterNextRender(() => {
      this.#ngZone.runOutsideAngular(() => {
        this.setupEventListeners();
      });
    });
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

  onSignOut(): void {
    this.authStore.signOut();
  }
}
