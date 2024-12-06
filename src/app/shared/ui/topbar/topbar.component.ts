import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IUser } from 'app/shared/utils/types/models.type';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { selectUser } from 'app/shared/store/auth/auth.reducers';
import { authLinks, commonLinks } from './links';
import { MatIconModule } from '@angular/material/icon';
import { ApiImgPipe } from '../../pipes/api-img.pipe';

@Component({
  selector: 'app-topbar',
  imports: [CommonModule, RouterModule, FormsModule, NgOptimizedImage, MatIconModule, ApiImgPipe],
  templateUrl: './topbar.component.html'
})
export class TopbarComponent implements OnInit {
  isOpen = signal(false);
  commonLinks = commonLinks;
  authLinks = authLinks;
  user$: Observable<IUser>;
  #store = inject(Store);

  ngOnInit(): void {
    this.user$ = this.#store.pipe(select(selectUser));
  }

  openMenu(): void {
    this.isOpen.set(true);
  }

  closeMenu(): void {
    this.isOpen.set(false);
  }

  trimName(name: string): string {
    const firstname = name.split(' ')[0];
    return firstname.length > 10 ? firstname.split(' ')[0].substring(0, 10) + '...' : firstname;
  }
}
