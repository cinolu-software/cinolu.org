import { patchState, signalStore, withComputed, withMethods, withProps, withState } from '@ngrx/signals';
import { inject, computed } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, of, pipe, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from '@core/services/toast/toastr.service';
import { IProduct } from '@shared/models/entities.models';

interface IProductsStore {
  products: IProduct[];
  selectedProduct: IProduct | null;
  isLoading: boolean;
  totalCount: number;
}

export const ProductsStore = signalStore(
  { providedIn: 'root' },
  withState<IProductsStore>({
    products: [],
    selectedProduct: null,
    isLoading: false,
    totalCount: 0
  }),
  withProps(() => ({
    _http: inject(HttpClient),
    _toast: inject(ToastrService)
  })),
  withComputed(({ products, totalCount }) => ({
    hasMorePages: computed(() => (products()?.length ?? 0) < (totalCount() ?? 0)),
    isEmpty: computed(() => (products()?.length ?? 0) === 0)
  })),
  withMethods(({ _http, _toast, ...store }) => ({
    loadAllProducts: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(() => {
          return _http.get<{ data: [IProduct[], number] }>('products/by-user').pipe(
            tap(({ data }) => {
              const [products, totalCount] = data;
              patchState(store, {
                products,
                totalCount,
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
    loadProductBySlug: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((slug) => {
          return _http.get<{ data: { product: IProduct } }>(`products/${slug}`).pipe(
            tap(({ data }) => {
              const product = data.product || data;
              patchState(store, { selectedProduct: product, isLoading: false });
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

    createProduct: rxMethod<{ data: Partial<IProduct> & { ventureId: string }; onSuccess?: () => void }>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(({ data, onSuccess }) => {
          return _http.post<{ data: { product: IProduct } }>('products', data).pipe(
            tap(({ data }) => {
              const { product } = data;
              patchState(store, {
                products: [product, ...(store.products() ?? [])],
                totalCount: (store.totalCount() ?? 0) + 1,
                isLoading: false
              });
              _toast.showSuccess('Produit créé avec succès');
              onSuccess?.();
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

    updateProduct: rxMethod<{ slug: string; data: Partial<IProduct>; onSuccess?: () => void }>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(({ slug, data, onSuccess }) => {
          return _http.patch<{ data: { product: IProduct } }>(`products/${slug}`, data).pipe(
            tap(({ data }) => {
              const { product: updated } = data;
              const updatedList = (store.products() ?? []).map((p) => (p.slug === slug ? updated : p));
              patchState(store, {
                products: updatedList,
                selectedProduct: store.selectedProduct()?.slug === slug ? updated : store.selectedProduct(),
                isLoading: false
              });
              _toast.showSuccess('Produit mis à jour');
              onSuccess?.();
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

    deleteProduct: rxMethod<{ id: string; onSuccess?: () => void }>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(({ id, onSuccess }) => {
          return _http.delete<void>(`products/${id}`).pipe(
            tap(() => {
              const filteredList = (store.products() ?? []).filter((p) => p.id !== id);
              patchState(store, {
                products: filteredList,
                totalCount: Math.max(0, store.totalCount() - 1),
                isLoading: false
              });
              _toast.showSuccess('Produit supprimé');
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
    resetSelection: () => patchState(store, { selectedProduct: null })
  }))
);
