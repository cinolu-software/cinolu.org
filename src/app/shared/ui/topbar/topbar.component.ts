import { Component, HostListener, inject, OnInit, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IUser } from 'app/shared/utils/types/models.type';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { selectUser } from 'app/shared/store/auth/auth.reducers';
import { explorationLinks, myCinoluLinks } from '../../utils/data/links';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { ApiImgPipe } from '../../pipes/api-img.pipe';
import { ILink } from './types/link.type';

@Component({
  selector: 'app-topbar',
  imports: [CommonModule, RouterModule, MatIconModule, NgOptimizedImage, MatMenuModule, MatButtonModule, ApiImgPipe],
  templateUrl: './topbar.component.html'
})
export class TopbarComponent implements OnInit {
  isOpen = signal(false);
  user$: Observable<IUser>;
  #store = inject(Store);
  activeTab = signal<string | null>(null);

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
    console.log('closed');
    this.isOpen.set(false);
  }

  trimName(name: string): string {
    return name.length > 15 ? name.slice(0, 15) + '...' : name;
  }

  getLinks(tab: string): ILink[] {
    const links = {
      Parcourir: explorationLinks,
      'My cinolu': myCinoluLinks
    };
    return links[tab];
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    const navBox = document.querySelector('.nav-active');
    const target = event.target as Node;
    if (navBox && target.nodeName !== 'BUTTON') {
      this.activeTab.set(null);
      this.isOpen.set(false);
    }
  }
}
