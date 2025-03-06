import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IUser } from 'app/shared/utils/types/models.type';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { selectUser } from 'app/shared/store/auth/auth.reducers';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ILink } from '../../../../utils/types/link.type';
import { AuthService } from '../../../../../auth/data-access/auth.service';
import { IAPIResponse } from '../../../../services/api/types/api-response.type';
import { environment } from 'environments/environment';
import { MobileNavComponent } from '../../ui/mobile-nav/mobile-nav.component';
import { DesktopNavComponent } from '../../ui/desktop-nav/desktop-nav.component';
import { EXPLORATION_LINKS, MY_CINOLU_LINKS } from '../../../../utils/data/links';

@Component({
  selector: 'app-topbar',
  imports: [CommonModule, MatIconModule, MatButtonModule, MobileNavComponent, DesktopNavComponent],
  templateUrl: './topbar.component.html'
})
export class TopbarComponent implements OnInit {
  #store = inject(Store);
  #authService = inject(AuthService);
  user$: Observable<IUser>;
  logout$: Observable<IAPIResponse<void>>;
  accUrl = environment.accountUrl;
  tabs = signal<string[]>(['Parcourir', 'My cinolu']);
  links = signal<Record<string, ILink[]>>({
    Parcourir: EXPLORATION_LINKS,
    'My cinolu': MY_CINOLU_LINKS
  });

  ngOnInit(): void {
    this.user$ = this.#store.pipe(select(selectUser));
  }

  signOut(): void {
    this.logout$ = this.#authService.signOut();
  }
}
