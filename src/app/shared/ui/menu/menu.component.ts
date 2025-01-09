import { Component, ElementRef, inject, OnInit, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IUser } from 'app/shared/utils/types/models.type';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { selectUser } from 'app/shared/store/auth/auth.reducers';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { ApiImgPipe } from '../../pipes/api-img.pipe';
import { ILink } from '../../utils/types/link.type';
import { AuthService } from '../../../auth/data-access/auth.service';
import { IAPIResponse } from '../../services/api/types/api-response.type';
import { explorationLinks, myCinoluLinks } from '../../utils/data/links';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-topbar',
  host: { '(document:click)': 'onClickOutside($event)' },
  imports: [CommonModule, RouterModule, MatIconModule, NgOptimizedImage, MatMenuModule, MatButtonModule, ApiImgPipe],
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {
  isOpen = signal(false);
  user$: Observable<IUser>;
  #store = inject(Store);
  activeTab = signal<string | null>(null);
  #authService = inject(AuthService);
  #element = inject(ElementRef);
  logout$: Observable<IAPIResponse<void>>;
  accUrl = environment.accountUrl;

  ngOnInit(): void {
    this.user$ = this.#store.pipe(select(selectUser));
  }

  setActiveTab(tab: string): void {
    this.activeTab.set(tab);
  }

  hasRequiredRole(user: IUser): boolean {
    const requiredRoles = ['admin', 'staff', 'coach'];
    return user.roles.some((role) => requiredRoles.includes(role));
  }

  openMenu(): void {
    this.isOpen.set(true);
  }

  closeMenu(): void {
    this.isOpen.set(false);
  }

  signOut(): void {
    this.setActiveTab(null);
    this.logout$ = this.#authService.signOut();
  }

  getLinks(tab: string): ILink[] {
    const links = {
      Parcourir: explorationLinks,
      'My cinolu': myCinoluLinks
    };
    return links[tab];
  }

  onClickOutside(event: MouseEvent): void {
    if (!this.#element.nativeElement.contains(event.target)) {
      this.activeTab.set(null);
      this.isOpen.set(false);
    }
  }
}
