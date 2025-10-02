import {
  signalStore,
  withState,
  withMethods,
  patchState,
  withProps,
} from '@ngrx/signals';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, of, pipe, switchMap, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { IImage } from '../../../shared/models/entities.models';

interface IGalleryStore {
  isLoading: boolean;
  gallery: IImage | null;
}

export const GalleryEventStore = signalStore(
  withState<IGalleryStore>({ isLoading: false, gallery: null }),
  withProps(() => ({
    _http: inject(HttpClient),
  })),
  withMethods(({ _http, ...store }) => ({
    loadGallery: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((slug) => {
          return _http.get<{ data: IImage }>(`galleries/event/${slug}`).pipe(
            tap(({ data }) => {
              console.log(data);
              patchState(store, { isLoading: false, gallery: data });
            }),
            catchError((e) => {
              console.log(e);
              patchState(store, { isLoading: false });
              return of(null);
            }),
          );
        }),
      ),
    ),
  })),
);
