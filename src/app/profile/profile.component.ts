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
import { environment } from 'environments/environment';
import { ProfileService } from './data-access/profile.service';
import { IAPIResponse } from '../shared/services/api/types/api-response.type';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-profile',
  providers: [ProfileService],
  imports: [
    MatIconModule,
    CommonModule,
    ApiImgPipe,
    NgOptimizedImage,
    ApplicationsComponent,
    UpdateInfoComponent,
    UpdatePasswordComponent,
    MatProgressSpinnerModule
  ],
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  activeTab = signal('info');
  #store = inject(Store);
  #profileService = inject(ProfileService);
  user$: Observable<IUser | null>;
  update$: Observable<IAPIResponse<IUser>>;
  appUrl = environment.accountUrl;

  ngOnInit(): void {
    this.user$ = this.#store.pipe(select(selectUser));
  }

  hasRequiredRole(user: IUser): boolean {
    return user.roles.includes('admin') || user.roles.includes('staff');
  }

  onImageChange(event: Event): void {
    const fileInput: HTMLInputElement = event.target as HTMLInputElement;
    const file: File | undefined = fileInput.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('thumb', file);
      this.update$ = this.#profileService.updateImage(formData);
    }
  }

  setActiveTab(tab: string): void {
    this.activeTab.set(tab);
  }
}
