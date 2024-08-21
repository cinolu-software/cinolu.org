import { CommonModule, NgClass, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUser } from 'app/core/auth/data-access/auth.reducers';
import { IUser } from 'app/core/types/models.interface';
import { environment } from 'environments/environment.development';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'user',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, MatIconModule, NgClass, MatDividerModule, CommonModule, NgOptimizedImage]
})
export class UserComponent implements OnInit, OnDestroy {
  user$: Observable<IUser>;
  showAvatar = false;
  private _unsubscribeAll = new Subject();
  private _store: Store = inject(Store);
  private _router: Router = inject(Router);
  private _apiUrl = environment.apiUrl;

  ngOnInit(): void {
    this.user$ = this._store.select(selectUser);
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  signOut(): void {
    this._router.navigate(['/sign-out']);
  }

  displayImage(user: IUser): string {
    if (user.profile || user.google_image) {
      this.showAvatar = true;
      return this._apiUrl + 'uploads/profiles/' + user.profile ? user.profile : user.google_image;
    }
  }
}
