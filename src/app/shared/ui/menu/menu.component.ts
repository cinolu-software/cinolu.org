import { Component, ElementRef, inject, OnInit, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IUser } from 'app/shared/utils/types/models.type';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { selectUser } from 'app/shared/store/auth/auth.reducers';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ApiImgPipe } from '../../pipes/api-img.pipe';
import { ILink } from '../../utils/types/link.type';
import { AuthService } from '../../../auth/data-access/auth.service';
import { IAPIResponse } from '../../services/api/types/api-response.type';
import { explorationLinks, myCinoluLinks } from '../../utils/data/links';
import { environment } from 'environments/environment';
import { LoadingBarComponent } from '../loading-bar/loading-bar.component';

@Component({
  selector: 'app-topbar',
  host: { '(document:click)': 'onClickOutside($event)' },
  imports: [
    CommonModule,
    RouterLink,
    MatIconModule,
    NgOptimizedImage,
    MatButtonModule,
    ApiImgPipe,
    LoadingBarComponent
  ],
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {
  isOpen = signal(false);
  activeTab = signal<string | null>(null);
  user$: Observable<IUser>;
  logout$: Observable<IAPIResponse<void>>;
  accUrl = environment.accountUrl;
  #store = inject(Store);
  #authService = inject(AuthService);
  #element = inject(ElementRef);
  tabs = [$localize`Parcourir`, 'My cinolu'];

  ngOnInit(): void {
    this.user$ = this.#store.pipe(select(selectUser));
  }

  setActiveTab(tab: string): void {
    this.activeTab.set(tab);
  }

  openMenu(): void {
    this.isOpen.set(true);
  }

  closeMenu(): void {
    this.activeTab.set(null);
    this.isOpen.set(false);
  }

  signOut(): void {
    this.logout$ = this.#authService.signOut();
    this.closeMenu();
  }

  getTabName(tab: string): string {
    return tab?.toLowerCase() === 'browse' ? 'Parcourir' : tab;
  }

  getLinks(tab: string): ILink[] {
    const links = {
      Parcourir: explorationLinks,
      'My cinolu': myCinoluLinks
    };
    return links[this.getTabName(tab)];
  }

  onClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const ref = this.#element.nativeElement as HTMLElement;
    if ((this.activeTab() || this.isOpen()) && !ref.contains(target)) {
      this.closeMenu();
    }
  }
}
