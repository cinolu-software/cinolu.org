import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IUser } from '../../../shared/utils/types/models.type';
import { selectUser } from '../../../shared/store/auth/auth.reducers';
import { ApiImgPipe } from '../../../shared/pipes/api-img.pipe';
import { UpdateInfoComponent } from '../update-info/update-info.component';
import { UpdatePasswordComponent } from '../update-password/update-password.component';
import { ProfileService } from '../../data-access/profile.service';
import { IAPIResponse } from '../../../shared/services/api/types/api-response.type';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserVenturesComponent } from '../ventures/ventures.component';
import { tabs } from '../../utils/data/tabs';

@Component({
  selector: 'app-profile',
  providers: [ProfileService],
  imports: [
    MatIconModule,
    CommonModule,
    ApiImgPipe,
    NgOptimizedImage,
    UserVenturesComponent,
    UpdateInfoComponent,
    UpdatePasswordComponent,
    MatProgressSpinnerModule,
    RouterModule
  ],
  templateUrl: './overview.component.html'
})
export class OverviewComponent {
  #store = inject(Store);
  #profileService = inject(ProfileService);
  #router = inject(Router);
  #route = inject(ActivatedRoute);
  activeTab = signal<string | null>(null);
  user$: Observable<IUser | null>;
  update$: Observable<IAPIResponse<IUser>>;
  tabs = tabs;

  constructor() {
    this.user$ = this.#store.pipe(select(selectUser));
    this.activeTab.set(this.#route.snapshot.queryParams?.tab);
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
    const queryParams = { tab };
    this.#router.navigate(['/me'], { queryParams });
  }
}
