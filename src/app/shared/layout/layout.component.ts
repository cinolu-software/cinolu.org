import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subject, filter, takeUntil } from 'rxjs';
import { EmptyLayoutComponent } from './feature/empty-layout/empty-layout.component';
import { AppConfig } from '../services/config/config.types';
import { AppConfigService } from '../services/config/config.service';
import { FullLayoutComponent } from './feature/full-layout/full-layout.component';
import { ProfileLayoutComponent } from './feature/profile-layout/profile-layout.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  imports: [EmptyLayoutComponent, FullLayoutComponent, ProfileLayoutComponent],
})
export class LayoutComponent implements OnInit, OnDestroy {
  config: AppConfig = {} as AppConfig;
  layout = 'full';
  #unsubscribeAll = new Subject();
  #router = inject(Router);
  #activatedRoute = inject(ActivatedRoute);
  #configService = inject(AppConfigService);

  ngOnInit(): void {
    this.#configService.config$.pipe(takeUntil(this.#unsubscribeAll)).subscribe((config) => {
      this.config = config as AppConfig;
      this._updateLayout();
    });
    this.#router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this.#unsubscribeAll),
      )
      .subscribe(() => {
        this._updateLayout();
      });
  }

  ngOnDestroy(): void {
    this.#unsubscribeAll.next(null);
    this.#unsubscribeAll.complete();
  }

  private _updateLayout(): void {
    let route = this.#activatedRoute;
    while (route.firstChild) {
      route = route.firstChild;
    }
    this.layout = this.config.layout;
    const layoutFromQueryParam = route.snapshot.queryParamMap.get('layout');
    if (layoutFromQueryParam) {
      this.layout = layoutFromQueryParam;
      if (this.config) {
        this.config.layout = layoutFromQueryParam;
      }
    }
    const paths = route.pathFromRoot;
    paths.forEach((path) => {
      if (path.routeConfig && path.routeConfig.data && path.routeConfig.data['layout']) {
        this.layout = path.routeConfig.data['layout'];
      }
    });
  }
}
