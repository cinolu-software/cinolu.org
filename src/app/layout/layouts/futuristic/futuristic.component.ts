import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { FuseFullscreenComponent } from '@fuse/components/fullscreen';
import { FuseLoadingBarComponent } from '@fuse/components/loading-bar';
import { FuseNavigationService, FuseVerticalNavigationComponent } from '@fuse/components/navigation';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { Store } from '@ngrx/store';
import { selectUser } from 'app/core/auth/data-access/auth.reducers';
import { NavigationService } from 'app/core/navigation/navigation.service';
import { Navigation } from 'app/core/navigation/navigation.types';
import { IUser } from 'app/core/types/models.interface';
import { NotificationsComponent } from 'app/layout/common/notifications/notifications.component';
import { SearchComponent } from 'app/layout/common/search/search.component';
import { UserComponent } from 'app/layout/common/user/user.component';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'futuristic-layout',
  templateUrl: './futuristic.component.html',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    FuseLoadingBarComponent,
    FuseVerticalNavigationComponent,
    UserComponent,
    MatButtonModule,
    MatIconModule,
    SearchComponent,
    NotificationsComponent,
    RouterOutlet,
    NgOptimizedImage,
    CommonModule,
    RouterLink
  ]
})
export class FuturisticLayoutComponent implements OnInit, OnDestroy {
  isScreenSmall: boolean;
  navigation: Navigation;
  user$: Observable<IUser>;
  private _unsubscribeAll = new Subject();
  private _navigationService: NavigationService = inject(NavigationService);
  private _fuseMediaWatcherService: FuseMediaWatcherService = inject(FuseMediaWatcherService);
  private _fuseNavigationService: FuseNavigationService = inject(FuseNavigationService);
  private _store: Store = inject(Store);

  get currentYear(): number {
    return new Date().getFullYear();
  }

  ngOnInit(): void {
    this._navigationService.navigation$.pipe(takeUntil(this._unsubscribeAll)).subscribe((navigation: Navigation) => {
      this.navigation = navigation;
    });
    this._fuseMediaWatcherService.onMediaChange$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(({ matchingAliases }) => {
        this.isScreenSmall = !matchingAliases.includes('md');
      });
    this.user$ = this._store.select(selectUser);
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  toggleNavigation(name: string): void {
    const navigation = this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>(name);
    if (navigation) {
      navigation.toggle();
    }
  }
}
