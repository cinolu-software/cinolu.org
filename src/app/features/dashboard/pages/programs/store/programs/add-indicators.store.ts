import { patchState, signalStore, withMethods, withProps, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, of, pipe, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from '../../../../../../core/services/toast/toastr.service';
import { IIndicator } from '../../../../../../shared/models/entities.models';

interface IAddIndicatorStore {
  isLoading: boolean;
}

export interface IndicatorDto {
  year: number;
  metrics: Record<string, number>[];
}

export const AddIndicatorStore = signalStore(
  withState<IAddIndicatorStore>({ isLoading: false }),
  withProps(() => ({
    _http: inject(HttpClient),
    _toast: inject(ToastrService)
  })),
  withMethods(({ _http, _toast, ...store }) => ({
    addIndicator: rxMethod<{ id: string; indicators: IndicatorDto }>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(({ id, indicators }) => {
          return _http.post<{ data: IIndicator[] }>(`programs/indicators/${id}`, indicators).pipe(
            tap(() => {
              _toast.showSuccess('Les indicateurs ont été ajoutés');
              patchState(store, { isLoading: false });
            }),
            catchError(() => {
              _toast.showError("Une erreur s'est produite");
              patchState(store, { isLoading: false });
              return of(null);
            })
          );
        })
      )
    )
  }))
);
