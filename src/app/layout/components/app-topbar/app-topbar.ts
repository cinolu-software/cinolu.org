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

@Component({
  selector: 'app-topbar',
  imports: [
    CommonModule,
    NgOptimizedImage,
    RouterLink,
    MobileNav,
    DesktopNav,
  ],
  templateUrl: './app-topbar.html',
})
export class AppTopbar implements OnDestroy {
  #elementRef = inject(ElementRef);
  isFixed = signal(false);
  links = signal(EXPLORATION_LINKS);
  fixed = input(false);
  mobileNav = viewChild(MobileNav);
  desktopNav = viewChild(DesktopNav);
  #destroy$ = new Subject<void>();
  #ngZone = inject(NgZone);

  constructor() {
    afterNextRender(() => {
      this.#ngZone.runOutsideAngular(() => {
        this.setupEventListeners();
      });
    });
  }

  closeNav(): void {
    this.mobileNav()?.closeNav();
    this.desktopNav()?.closeNav();
  }

  setupEventListeners(): void {
    const click$ = fromEvent(document, 'click');
    const scroll$ = fromEvent(window, 'scroll');
    click$.pipe(takeUntil(this.#destroy$)).subscribe((event: Event) => {
      const isInside = this.#elementRef.nativeElement.contains(event.target);
      const isMenuOpen =
        this.mobileNav()?.isOpen() || this.desktopNav()?.activeTab();
      if (isMenuOpen && !isInside) this.closeNav();
    });
    scroll$.pipe(takeUntil(this.#destroy$)).subscribe(() => {
      const shouldFix = window.scrollY > 20;
      if (this.isFixed() !== shouldFix) this.isFixed.set(shouldFix);
      if (this.mobileNav()?.isOpen() || this.desktopNav()?.activeTab())
        this.closeNav();
    });
  }

  ngOnDestroy(): void {
    this.#destroy$.next();
    this.#destroy$.complete();
  }
}
