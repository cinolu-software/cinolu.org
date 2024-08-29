import { CommonModule, NgClass, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUser } from 'app/core/auth/data-access/auth.reducers';
import { IUser } from 'app/core/types/models.interface';
import { environment } from 'environments/environment.development';
import { Observable } from 'rxjs';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'user',
  standalone: true,
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    NgClass,
    MatDividerModule,
    CommonModule,
    NgOptimizedImage,
    RouterLink
  ]
})
export class UserComponent {
  user$: Observable<IUser>;
  private _store: Store = inject(Store);
  private _router: Router = inject(Router);
  private _apiUrl = environment.apiUrl;

  constructor() {
    this.user$ = this._store.select(selectUser);
  }

  signOut(): void {
    this._router.navigate(['/sign-out']);
  }

  displayImage(user: IUser): string {
    if (user.profile || user.google_image) {
      return this._apiUrl + 'uploads/profiles/' + user.profile ? user.profile : user.google_image;
    }
  }
}
