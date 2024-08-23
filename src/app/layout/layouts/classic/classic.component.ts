import { NgOptimizedImage } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { FuseFullscreenComponent } from '@fuse/components/fullscreen';
import { FuseLoadingBarComponent } from '@fuse/components/loading-bar';
import { FuseNavigationService, FuseVerticalNavigationComponent } from '@fuse/components/navigation';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { NavigationService } from 'app/core/navigation/navigation.service';
import { Navigation } from 'app/core/navigation/navigation.types';
import { MessagesComponent } from 'app/layout/common/messages/messages.component';
import { NotificationsComponent } from 'app/layout/common/notifications/notifications.component';
import { QuickChatComponent } from 'app/layout/common/quick-chat/quick-chat.component';
import { SearchComponent } from 'app/layout/common/search/search.component';
import { ShortcutsComponent } from 'app/layout/common/shortcuts/shortcuts.component';
import { UserComponent } from 'app/layout/common/user/user.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'classic-layout',
  templateUrl: './classic.component.html',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    FuseLoadingBarComponent,
    FuseVerticalNavigationComponent,
    MatButtonModule,
    MatIconModule,
    FuseFullscreenComponent,
    SearchComponent,
    ShortcutsComponent,
    MessagesComponent,
    NotificationsComponent,
    UserComponent,
    RouterOutlet,
    NgOptimizedImage,
    RouterLink
  ]
})
export class ClassicLayoutComponent implements OnInit, OnDestroy {
  isScreenSmall: boolean;
  navigation: Navigation;
  private _unsubscribeAll = new Subject();
  private _navigationService = inject(NavigationService);
  private _fuseMediaWatcherService = inject(FuseMediaWatcherService);
  private _fuseNavigationService = inject(FuseNavigationService);

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
