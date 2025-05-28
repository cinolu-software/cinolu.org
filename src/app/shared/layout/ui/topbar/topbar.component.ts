import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  input,
  NgZone,
  OnDestroy,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
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
  standalone: true,
  imports: [CommonModule, RouterLink, MobileNavComponent, DesktopNavComponent, NgOptimizedImage],
  templateUrl: './topbar.component.html',
})
export class TopbarComponent implements OnInit, AfterViewInit, OnDestroy {
  #store = inject(Store);
  #authService = inject(AuthService);
  #ngZone = inject(NgZone);
  elementRef = inject(ElementRef);
  user$: Observable<IUser | null> | undefined;
  logout$: Observable<IAPIResponse<void>> | undefined;
  tabs = signal<string[]>(['Parcourir', 'My Cinolu']);
  isFixed = signal<boolean>(false);
  fixed = input<boolean>(false);
  mobileNav = viewChild(MobileNavComponent);
  desktopNav = viewChild(DesktopNavComponent);
  #unSubscribe = new Subject<void>();
  #removeListeners: (() => void)[] = [];
  accountUrl = environment.accountUrl;
  links = signal<Record<string, ILink[]>>({
    Parcourir: EXPLORATION_LINKS,
    'My Cinolu': MY_CINOLU_LINKS,
  });

  ngOnInit(): void {
    this.user$ = this.#store.pipe(select(selectUser));
  }

  ngAfterViewInit(): void {
    this.#ngZone.runOutsideAngular(() => {
      const onClick = (event: Event) => {
        const isInside = this.elementRef.nativeElement.contains(event.target);
        const isMenuOpen = this.desktopNav()?.activeTab() || this.mobileNav()?.isOpen();
        if (isMenuOpen && !isInside) {
          this.#ngZone.run(() => this.closeNav());
        }
      };
      const onScroll = () => {
        const shouldFix = window.scrollY > 20;
        if (this.isFixed() !== shouldFix) {
          this.#ngZone.run(() => this.isFixed.set(shouldFix));
        }
        const isMenuOpen = this.desktopNav()?.activeTab() || this.mobileNav()?.isOpen();
        if (isMenuOpen) {
          this.#ngZone.run(() => this.closeNav());
        }
      };
      document.addEventListener('click', onClick);
      window.addEventListener('scroll', onScroll);
      this.#removeListeners = [
        () => document.removeEventListener('click', onClick),
        () => window.removeEventListener('scroll', onScroll),
      ];
    });
  }

  signOut(): void {
    this.#authService.signOut().pipe(takeUntil(this.#unSubscribe)).subscribe();
  }

  closeNav(): void {
    this.desktopNav()?.closeNav();
    this.mobileNav()?.closeNav();
  }

  ngOnDestroy(): void {
    this.#unSubscribe.next();
    this.#unSubscribe.complete();
    this.#removeListeners.forEach((remove) => remove());
  }
}
