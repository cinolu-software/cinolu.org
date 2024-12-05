import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ApplicationsComponent } from './features/applications/applications.component';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IUser } from '../shared/utils/types/models.type';
import { selectUser } from '../shared/store/auth/auth.reducers';
import { ApiImgPipe } from '../shared/pipes/api-img.pipe';
import { UpdateInfoComponent } from './features/account/update-info/update-info.component';
import { UpdatePasswordComponent } from './features/account/update-password/update-password.component';

@Component({
  selector: 'app-profile',
  imports: [
    MatIconModule,
    CommonModule,
    ApiImgPipe,
    NgOptimizedImage,
    ApplicationsComponent,
    UpdateInfoComponent,
    UpdatePasswordComponent
  ],
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  activeTab = signal('info');
  #store = inject(Store);
  user$: Observable<IUser | null>;

  ngOnInit(): void {
    this.user$ = this.#store.pipe(select(selectUser));
  }

  setActiveTab(tab: string): void {
    this.activeTab.set(tab);
  }
}
