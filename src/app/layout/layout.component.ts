import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subject, filter, takeUntil } from 'rxjs';
import { AppConfigService } from '../core/services/config/config.service';
import { AppConfig } from '../core/services/config/config.types';
import { DashboardLayoutComponent } from './pages/dashboard-layout/dashboard-layout.component';
import { EmptyLayoutComponent } from './pages/empty-layout/empty-layout.component';
import { FixedLayoutComponent } from './pages/fixed-layout/fixed-layout.component';
import { FullLayoutComponent } from './pages/full-layout/full-layout.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  imports: [FixedLayoutComponent, EmptyLayoutComponent, FullLayoutComponent, DashboardLayoutComponent]
})
export class LayoutComponent implements OnInit, OnDestroy {
  config: AppConfig = {} as AppConfig;
  layout = 'full-layout';
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
        takeUntil(this.#unsubscribeAll)
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
