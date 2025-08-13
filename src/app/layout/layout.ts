import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subject, filter, takeUntil } from 'rxjs';
import { AppConfigService } from '../core/services/config/config.service';
import { AppConfig } from '../core/services/config/config.types';
import { DashboardLayout } from './pages/dashboard-layout/dashboard-layout';
import { EmptyLayout } from './pages/empty-layout/empty-layout';
import { FixedLayout } from './pages/fixed-layout/fixed-layout';
import { FullLayout } from './pages/full-layout/full-layout';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.html',
  imports: [
    FixedLayout,
    EmptyLayout,
    FullLayout,
    DashboardLayout,
  ],
})
export class Layout implements OnInit, OnDestroy {
  config: AppConfig = {} as AppConfig;
  layout = 'full-layout';
  #unsubscribeAll = new Subject();
  #router = inject(Router);
  #activatedRoute = inject(ActivatedRoute);
  #configService = inject(AppConfigService);

  ngOnInit(): void {
    this.#configService.config$
      .pipe(takeUntil(this.#unsubscribeAll))
      .subscribe((config) => {
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
      if (
        path.routeConfig &&
        path.routeConfig.data &&
        path.routeConfig.data['layout']
      ) {
        this.layout = path.routeConfig.data['layout'];
      }
    });
  }
}
