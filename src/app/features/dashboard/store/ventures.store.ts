import { patchState, signalStore, withComputed, withMethods, withProps, withState } from '@ngrx/signals';
import { inject, computed } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, of, pipe, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from '@core/services/toast/toastr.service';
import { IVenture } from '@shared/models/entities.models';
import { Router } from '@angular/router';

interface IVenturesStore {
  ventures: IVenture[];
  selectedVenture: IVenture | null;
  isLoading: boolean;
  totalCount: number;
}

export const VenturesStore = signalStore(
  { providedIn: 'root' },
  withState<IVenturesStore>({
    ventures: [],
    selectedVenture: null,
    isLoading: false,
    totalCount: 0
  }),
  withProps(() => ({
    _http: inject(HttpClient),
    _toast: inject(ToastrService),
    _router: inject(Router)
  })),
  withComputed(({ ventures, totalCount }) => ({
    hasMorePages: computed(() => ventures().length < totalCount()),
    isEmpty: computed(() => ventures().length === 0)
  })),
  withMethods(({ _http, _toast, _router, ...store }) => ({
    loadAllVentures: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(() => {
          return _http.get<{ data: IVenture[] }>('ventures/by-user/unpaginated').pipe(
            tap(({ data }) => {
              patchState(store, {
                ventures: data,
                totalCount: data.length,
                isLoading: false
              });
            }),
            catchError((err) => {
              patchState(store, { isLoading: false });
              _toast.showError(err.error?.message || 'Erreur lors du chargement');
              return of(null);
            })
          );
        })
      )
    ),

    loadVentureBySlug: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((slug) => {
          return _http.get<{ data: IVenture | { venture: IVenture } }>(`ventures/by-slug/${slug}`).pipe(
            tap(({ data }) => {
              const venture = 'venture' in data ? data.venture : data;
              patchState(store, { selectedVenture: venture, isLoading: false });
            }),
            catchError((err) => {
              patchState(store, { isLoading: false });
              _toast.showError(err.error?.message || 'Erreur lors du chargement');
              return of(null);
            })
          );
        })
      )
    ),

    createVenture: rxMethod<{ data: Partial<IVenture>; onSuccess?: (venture: IVenture) => void }>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(({ data, onSuccess }) => {
          return _http.post<{ data: IVenture }>('ventures', data).pipe(
            tap(({ data: venture }) => {
              patchState(store, {
                ventures: [venture, ...store.ventures()],
                isLoading: false
              });
              _toast.showSuccess('Entreprise créée avec succès');
              _router.navigate(['/dashboard/ventures']);
              onSuccess?.(venture);
            }),
            catchError((err) => {
              patchState(store, { isLoading: false });
              _toast.showError(err.error?.message || 'Erreur lors de la création');
              return of(null);
            })
          );
        })
      )
    ),

    updateVenture: rxMethod<{ slug: string; data: Partial<IVenture>; onSuccess?: () => void }>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(({ slug, data, onSuccess }) => {
          return _http.patch<{ data: IVenture }>(`ventures/${slug}`, data).pipe(
            tap(({ data: updated }) => {
              patchState(store, {
                ventures: store.ventures().map((v) => (v.slug === slug ? updated : v)),
                selectedVenture: updated,
                isLoading: false
              });
              _toast.showSuccess('Entreprise mise à jour');
              onSuccess?.();
              _router.navigate(['/dashboard/ventures', updated.slug]);
            }),
            catchError((err) => {
              patchState(store, { isLoading: false });
              _toast.showError(err.error?.message || 'Erreur lors de la mise à jour');
              return of(null);
            })
          );
        })
      )
    ),

    deleteVenture: rxMethod<{ id: string; onSuccess?: () => void }>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(({ id, onSuccess }) => {
          return _http.delete<void>(`ventures/${id}`).pipe(
            tap(() => {
              patchState(store, {
                ventures: store.ventures().filter((v) => v.id !== id),
                isLoading: false
              });
              _toast.showSuccess('Venture supprimée');
              onSuccess?.();
            }),
            catchError((err) => {
              patchState(store, { isLoading: false });
              _toast.showError(err.error?.message || 'Erreur lors de la suppression');
              return of(null);
            })
          );
        })
      )
    ),

    uploadLogo: rxMethod<{ id: string; file: File; onSuccess?: () => void }>(
      pipe(
        switchMap(({ id, file, onSuccess }) => {
          const formData = new FormData();
          formData.append('logo', file);
          return _http.post<{ logo: string }>(`ventures/add-logo/${id}`, formData).pipe(
            tap(() => {
              _toast.showSuccess('Logo uploadé avec succès');
              onSuccess?.();
            }),
            catchError((err) => {
              _toast.showError(err.error?.message || "Erreur lors de l'upload");
              return of(null);
            })
          );
        })
      )
    ),

    uploadCover: rxMethod<{ id: string; file: File; onSuccess?: () => void }>(
      pipe(
        switchMap(({ id, file, onSuccess }) => {
          const formData = new FormData();
          formData.append('cover', file);
          return _http.post<{ cover: string }>(`/ventures/add-cover/${id}`, formData).pipe(
            tap(() => {
              _toast.showSuccess('Cover uploadée avec succès');
              onSuccess?.();
            }),
            catchError((err) => {
              _toast.showError(err.error?.message || "Erreur lors de l'upload");
              return of(null);
            })
          );
        })
      )
    ),

    removeGalleryImage: rxMethod<{ id: string; imageId: string; onSuccess?: () => void }>(
      pipe(
        switchMap(({ id, imageId, onSuccess }) => {
          return _http.delete<void>(`ventures/${id}/gallery/${imageId}`).pipe(
            tap(() => {
              _toast.showSuccess('Image supprimée de la galerie');
              onSuccess?.();
            }),
            catchError((err) => {
              _toast.showError(err.error?.message || 'Erreur lors de la suppression');
              return of(null);
            })
          );
        })
      )
    ),
    resetSelection: () => patchState(store, { selectedVenture: null })
  }))
);
