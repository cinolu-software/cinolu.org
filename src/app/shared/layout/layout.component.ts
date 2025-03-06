import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subject, filter, takeUntil } from 'rxjs';
import { EmptyLayoutComponent } from './layouts/empty/empty.component';
import { PrimaryLayoutComponent } from './layouts/primary/primary.component';
import { SecondaryLayoutComponent } from './layouts/secondary/secondary.component';
import { AppConfig } from '../services/config/config.types';
import { AppConfigService } from '../services/config/config.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  imports: [EmptyLayoutComponent, PrimaryLayoutComponent, SecondaryLayoutComponent]
})
export class LayoutComponent implements OnInit, OnDestroy {
  config: AppConfig;
  layout: string;
  #unsubscribeAll = new Subject();
  #router = inject(Router);
  #activatedRoute = inject(ActivatedRoute);
  #configService = inject(AppConfigService);

  ngOnInit(): void {
    this.#configService.config$.pipe(takeUntil(this.#unsubscribeAll)).subscribe((config: AppConfig) => {
      this.config = config;
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
      if (path.routeConfig && path.routeConfig.data && path.routeConfig.data.layout) {
        this.layout = path.routeConfig.data.layout;
      }
    });
  }
}
