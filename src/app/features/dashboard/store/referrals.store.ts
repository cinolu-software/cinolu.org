import { patchState, signalStore, withComputed, withMethods, withProps, withState } from '@ngrx/signals';
import { inject, computed } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, of, pipe, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from '@core/services/toast/toastr.service';
import { IUser } from '@shared/models/entities.models';

interface IReferralsStore {
  referralCode: string | null;
  referrals: IUser[];
  totalCount: number;
  isLoading: boolean;
}

export const ReferralsStore = signalStore(
  { providedIn: 'root' },
  withState<IReferralsStore>({
    referralCode: null,
    referrals: [],
    totalCount: 0,
    isLoading: false
  }),
  withComputed(({ referrals }) => ({
    isEmpty: computed(() => !referrals() || referrals().length === 0)
  })),
  withProps(() => ({
    _http: inject(HttpClient),
    _toast: inject(ToastrService)
  })),
  withMethods(({ _http, _toast, ...store }) => ({
    generateReferralCode: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(() => {
          return _http.post<{ referral_code: string }>('users/generate/referralCode', {}).pipe(
            tap(({ referral_code }) => {
              patchState(store, { referralCode: referral_code, isLoading: false });
              _toast.showSuccess('Code de parrainage généré');
            }),
            catchError((err) => {
              patchState(store, { isLoading: false });
              _toast.showError(err.error?.message || 'Erreur lors de la génération du code');
              return of(null);
            })
          );
        })
      )
    ),

    loadReferrals: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(() => {
          return _http.post<{ referrals: IUser[]; totalCount: number }>('users/find-referrals', {}).pipe(
            tap(({ referrals, totalCount }) => {
              patchState(store, { referrals, totalCount, isLoading: false });
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

    setReferralCode: (code: string) => patchState(store, { referralCode: code })
  }))
);
