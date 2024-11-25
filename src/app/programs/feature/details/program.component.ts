import { CommonModule, NgOptimizedImage, Location } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { IProgram, IUser } from 'app/shared/utils/types/models.type';
import { ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { APIImgPipe } from 'app/shared/pipes/api-img.pipe';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Observable } from 'rxjs';
import { IAPIResponse } from 'app/shared/services/api/types/api-response.type';
import { ProgramOverviewComponent } from './overview/overview.component';
import { ApplicationComponent } from './application/application.component';
import { Store } from '@ngrx/store';
import { selectUser } from 'app/shared/data-access/auth/auth.reducers';
import { ProgramSkeletonComponent } from '../../ui/program-skeleton/program-skeleton.component';
import { ProgramsService } from '../../data-access/programs.service';

@Component({
  selector: 'app-program',
  imports: [
    CommonModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    NgOptimizedImage,
    FormsModule,
    APIImgPipe,
    ProgramOverviewComponent,
    ApplicationComponent,
    ProgramSkeletonComponent
  ],
  templateUrl: './program.component.html'
})
export class ProgramComponent implements OnInit {
  program$: Observable<IAPIResponse<IProgram>>;
  user$: Observable<IUser>;
  #programsService = inject(ProgramsService);
  #activatedRoute = inject(ActivatedRoute);
  #store = inject(Store);
  #location = inject(Location);
  activeTab = signal('overview');

  ngOnInit(): void {
    this.user$ = this.#store.select(selectUser);
    const id = this.#activatedRoute.snapshot.paramMap.get('id');
    this.program$ = this.#programsService.getProgram(id);
  }

  setActiveTab(tab: string): void {
    this.activeTab.set(tab);
  }

  back(): void {
    this.#location.back();
  }
}
