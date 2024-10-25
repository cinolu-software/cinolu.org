import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Injectable, inject } from '@angular/core';
import { ConfigService } from '@core/services/config';
import { fromPairs } from 'lodash-es';
import { Observable, ReplaySubject, map, switchMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MediaWatcherService {
  #breakpointObserver = inject(BreakpointObserver);
  #configService = inject(ConfigService);

  private _onMediaChange: ReplaySubject<{
    matchingAliases: string[];
    matchingQueries: unknown;
  }> = new ReplaySubject<{ matchingAliases: string[]; matchingQueries: unknown }>(1);

  constructor() {
    this.#configService.config$
      .pipe(
        map((config) =>
          fromPairs(Object.entries(config['screens']).map(([alias, screen]) => [alias, `(min-width: ${screen})`]))
        ),
        switchMap((screens) =>
          this.#breakpointObserver.observe(Object.values(screens)).pipe(
            map((state) => {
              // Prepare the observable values and set their defaults
              const matchingAliases: string[] = [];
              const matchingQueries: unknown = {};

              // Get the matching breakpoints and use them to fill the subject
              const matchingBreakpoints = Object.entries(state.breakpoints).filter(([, matches]) => matches) ?? [];
              for (const [query] of matchingBreakpoints) {
                // Find the alias of the matching query
                const matchingAlias = Object.entries(screens).find(([, q]) => q === query)[0];

                // Add the matching query to the observable values
                if (matchingAlias) {
                  matchingAliases.push(matchingAlias);
                  matchingQueries[matchingAlias] = query;
                }
              }

              // Execute the observable
              this._onMediaChange.next({
                matchingAliases,
                matchingQueries
              });
            })
          )
        )
      )
      .subscribe();
  }

  get onMediaChange$(): Observable<{ matchingAliases: string[]; matchingQueries: unknown }> {
    return this._onMediaChange.asObservable();
  }

  onMediaQueryChange$(query: string | string[]): Observable<BreakpointState> {
    return this.#breakpointObserver.observe(query);
  }
}
