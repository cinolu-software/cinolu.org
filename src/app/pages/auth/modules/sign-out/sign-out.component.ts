import { NgOptimizedImage } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from 'app/pages/auth/auth.service';
import { Subject, finalize, takeUntil, takeWhile, tap, timer } from 'rxjs';

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [RouterLink, NgOptimizedImage]
})
export class AuthSignOutComponent implements OnInit, OnDestroy {
  #authService: AuthService = inject(AuthService);
  #unsubscribeAll = new Subject();
  countdown = 5;

  ngOnInit(): void {
    timer(1000, 1000)
      .pipe(
        finalize(() => {
          this.#authService.signOut().mutate({});
        }),
        takeWhile(() => this.countdown > 0),
        takeUntil(this.#unsubscribeAll),
        tap(() => this.countdown--)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.#unsubscribeAll.next(null);
    this.#unsubscribeAll.complete();
  }
}
