import { CommonModule, Location, NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { IProgram, IUser } from 'app/shared/utils/types/models.type';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ApiImgPipe } from 'app/shared/pipes/api-img.pipe';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Observable } from 'rxjs';
import { IAPIResponse } from 'app/shared/services/api/types/api-response.type';
import { ProgramOverviewComponent } from './overview/overview.component';
import { ApplicationComponent } from './application/application.component';
import { Store } from '@ngrx/store';
import { selectUser } from 'app/shared/store/auth/auth.reducers';
import { ProgramSkeletonComponent } from '../../ui/program-skeleton/program-skeleton.component';
import { ProgramsService } from '../../data-access/programs.service';
import { FooterComponent } from '../../../shared/ui/footer/footer.component';

@Component({
  selector: 'app-program',
  providers: [ProgramsService],
  imports: [
    CommonModule,
    NgOptimizedImage,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    FormsModule,
    ApiImgPipe,
    ProgramOverviewComponent,
    ApplicationComponent,
    ProgramSkeletonComponent,
    FooterComponent
  ],
  templateUrl: './program.component.html'
})
export class ProgramComponent implements OnInit {
  program$: Observable<IAPIResponse<IProgram>>;
  user$: Observable<IUser>;
  #programsService = inject(ProgramsService);
  #route = inject(ActivatedRoute);
  #router = inject(Router);
  #store = inject(Store);
  #location = inject(Location);
  activeTab = signal<string | null>(null);
  #id: string;

  constructor() {
    this.#id = this.#route.snapshot.paramMap.get('id');
    this.user$ = this.#store.select(selectUser);
    this.activeTab.set(this.#route.snapshot.queryParams?.tab);
  }

  ngOnInit(): void {
    this.program$ = this.#programsService.getProgram(this.#id);
  }

  setActiveTab(tab: string): void {
    this.activeTab.set(tab);
    const queryParams = { tab };
    this.#router.navigate(['/programs', this.#id], { queryParams });
  }

  back(): void {
    this.#location.back();
  }
}
