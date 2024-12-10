import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ProjectsComponent } from './features/projects/projects.component';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { IEvent, IProgram, IUser } from '../shared/utils/types/models.type';
import { selectUser } from '../shared/store/auth/auth.reducers';
import { ApiImgPipe } from '../shared/pipes/api-img.pipe';
import { UpdateInfoComponent } from './features/account/update-info/update-info.component';
import { UpdatePasswordComponent } from './features/account/update-password/update-password.component';
import { environment } from 'environments/environment';
import { ProfileService } from './data-access/profile.service';
import { IAPIResponse } from '../shared/services/api/types/api-response.type';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProgramsService } from '../programs/data-access/programs.service';
import { EventsService } from '../events/data-access/events.service';
import { FooterComponent } from '../shared/ui/footer/footer.component';

@Component({
  selector: 'app-profile',
  providers: [ProfileService, ProgramsService, EventsService],
  imports: [
    MatIconModule,
    CommonModule,
    ApiImgPipe,
    NgOptimizedImage,
    ProjectsComponent,
    UpdateInfoComponent,
    UpdatePasswordComponent,
    MatProgressSpinnerModule,
    RouterModule,
    FooterComponent
  ],
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  #store = inject(Store);
  #profileService = inject(ProfileService);
  #programsService = inject(ProgramsService);
  #eventsService = inject(EventsService);
  #router = inject(Router);
  #route = inject(ActivatedRoute);
  activeTab = signal<string | null>(null);
  user$: Observable<IUser | null>;
  update$: Observable<IAPIResponse<IUser>>;
  appUrl = environment.accountUrl;
  latests$: Observable<[IAPIResponse<IEvent[]>, IAPIResponse<IProgram[]>]>;

  constructor() {
    this.user$ = this.#store.pipe(select(selectUser));
    this.activeTab.set(this.#route.snapshot.queryParams?.tab);
  }

  ngOnInit(): void {
    this.latests$ = combineLatest([this.#eventsService.findLatests(), this.#programsService.findRecent()]);
  }

  hasRequiredRole(user: IUser): boolean {
    return user.roles.includes('admin') || user.roles.includes('staff') || user.roles.includes('coach');
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
