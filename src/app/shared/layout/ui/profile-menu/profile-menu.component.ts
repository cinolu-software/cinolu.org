import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  NgZone,
  OnDestroy,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Observable, Subject, takeUntil } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { AuthService } from '../../../../auth/data-access/auth.service';
import { DesktopProfileMenuComponent } from './desktop-menu/desktop-profile-menu.component';
import { MobileProfileMenuComponent } from './mobile-menu/mobile-profile-menu.component';
import { RouterLink } from '@angular/router';
import { IUser } from '../../../utils/types/models.type';
import { selectUser } from '../../../store/auth/auth.reducers';
import { IAPIResponse } from '../../../services/api/types/api-response.type';
import { EXPLORATION_LINKS } from '../../utils/data/links';
import { ILink } from '../../utils/types/link.type';

@Component({
  selector: 'app-profile-menu',
  standalone: true,
  imports: [CommonModule, RouterLink, MobileProfileMenuComponent, DesktopProfileMenuComponent, NgOptimizedImage],
  templateUrl: './profile-menu.component.html',
})
export class ProfileMenuComponent implements OnInit, AfterViewInit, OnDestroy {
  #store = inject(Store);
  #authService = inject(AuthService);
  #ngZone = inject(NgZone);
  #removeListeners: (() => void)[] = [];
  elementRef = inject(ElementRef);
  user$: Observable<IUser | null> | undefined;
  logout$: Observable<IAPIResponse<void>> | undefined;
  tabs = signal<string[]>(['Parcourir', 'My Cinolu']);
  mobileProfileMenu = viewChild(MobileProfileMenuComponent);
  desktopProfileMenu = viewChild(DesktopProfileMenuComponent);
  links = signal<Record<string, ILink[]>>({
    Parcourir: EXPLORATION_LINKS,
  });
  #unSubscribe = new Subject<void>();

  ngOnInit(): void {
    this.user$ = this.#store.pipe(select(selectUser));
  }

  closeNav(): void {
    this.desktopProfileMenu()?.closeNav();
    this.mobileProfileMenu()?.closeNav();
  }

  ngAfterViewInit(): void {
    this.#ngZone.runOutsideAngular(() => {
      const onClick = (event: Event) => {
        const isInside = this.elementRef.nativeElement.contains(event.target);
        const isMenuOpen = this.desktopProfileMenu()?.activeTab() || this.mobileProfileMenu()?.isOpen();
        if (isMenuOpen && !isInside) {
          this.#ngZone.run(() => this.closeNav());
        }
      };
      const onScroll = () => {
        const isMenuOpen = this.desktopProfileMenu()?.activeTab() || this.mobileProfileMenu()?.isOpen();
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

  ngOnDestroy(): void {
    this.#unSubscribe.next();
    this.#unSubscribe.complete();
    this.#removeListeners.forEach((remove) => remove());
  }
}
