import { Component, HostListener, inject, OnInit, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IUser } from 'app/shared/utils/types/models.type';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { selectUser } from 'app/shared/store/auth/auth.reducers';
import { explorationLinks, myCinoluLinks } from './links';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-topbar',
  imports: [CommonModule, RouterModule, MatIconModule, NgOptimizedImage],
  templateUrl: './topbar.component.html'
})
export class TopbarComponent implements OnInit {
  isOpen = signal(false);
  explorationLinks = explorationLinks;
  myCinoluLinks = myCinoluLinks;
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
    this.isOpen.set(false);
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    const navBox = document.querySelector('.nav-active');
    const target = event.target as Node;
    if (navBox && target.nodeName !== 'BUTTON' && target.parentElement.nodeName !== 'BUTTON') {
      this.activeTab.set(null);
      this.isOpen.set(false);
    }
  }
}
