import { NgOptimizedImage } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'app/core/auth/auth.service';
import { authActions } from 'app/core/auth/data-access/auth.actions';
import { Subject, finalize, takeUntil, takeWhile, tap, timer } from 'rxjs';

@Component({
  selector: 'auth-sign-out',
  templateUrl: './sign-out.component.html',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [RouterLink, NgOptimizedImage]
})
export class AuthSignOutComponent implements OnInit, OnDestroy {
  countdown: number = 5;
  private _authService: AuthService = inject(AuthService);
  private _router: Router = inject(Router);
  private _store: Store = inject(Store);
  private _unsubscribeAll = new Subject();

  ngOnInit(): void {
    this._authService.signOut();
    timer(1000, 1000)
      .pipe(
        finalize(() => {
          this._router.navigate(['/sign-in']);
          this._store.dispatch(authActions.signOut());
        }),
        takeWhile(() => this.countdown > 0),
        takeUntil(this._unsubscribeAll),
        tap(() => this.countdown--)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
