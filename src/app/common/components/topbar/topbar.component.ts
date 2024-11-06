import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IUser } from 'app/common/types/models.type';
import { environment } from 'environments/environment';
import { ImgPipe } from 'app/common/pipes/img.pipe';
import { ObservableQueryResult } from '@ngneat/query';
import { Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { selectUser } from '@core/auth/auth.reducers';
import { authLinks, commonLinks } from './links';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, RouterModule, NgOptimizedImage, FormsModule, ImgPipe],
  templateUrl: './topbar.component.html'
})
export class TopbarComponent implements OnInit, OnDestroy {
  isOpen = signal(false);
  accountUrl = environment.accountUrl;
  user: IUser | null;
  result$: ObservableQueryResult<IUser | null>;
  commonLinks = commonLinks;
  authLinks = authLinks;
  #store = inject(Store);
  #subscription: Subscription;

  ngOnInit(): void {
    this.#subscription = this.#store.pipe(select(selectUser)).subscribe((user) => (this.user = user));
  }

  trimName(name: string): string {
    return name.length > 15 ? name.substring(0, 15) + '...' : name;
  }

  toogleMenu(): void {
    this.isOpen.update((value) => !value);
  }

  ngOnDestroy(): void {
    this.#subscription.unsubscribe();
  }
}
