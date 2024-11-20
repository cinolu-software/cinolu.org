import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { IProgram, IUser } from 'app/common/types/models.type';
import { ProgramService } from './program.service';
import { ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { APIImgPipe } from 'app/common/pipes/api-img.pipe';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TopbarComponent } from '../../../common/components/topbar/topbar.component';
import { Observable } from 'rxjs';
import { IAPIResponse } from '@core/services/api/types/api-response.type';
import { ProgramOverviewComponent } from './components/overview/overview.component';
import { ApplicationComponent } from './components/application/application.component';
import { Store } from '@ngrx/store';
import { selectUser } from '@core/auth/auth.reducers';

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
    TopbarComponent,
    ProgramOverviewComponent,
    ApplicationComponent
  ],
  templateUrl: './program.component.html'
})
export class ProgramComponent implements OnInit {
  program$: Observable<IAPIResponse<IProgram>>;
  user$: Observable<IUser>;
  #programService = inject(ProgramService);
  #activatedRoute = inject(ActivatedRoute);
  #store = inject(Store);
  activeTab = signal('overview');

  ngOnInit(): void {
    this.user$ = this.#store.select(selectUser);
    const id = this.#activatedRoute.snapshot.paramMap.get('id');
    this.program$ = this.#programService.getProgram(id);
  }

  setActiveTab(tab: string): void {
    this.activeTab.set(tab);
  }
}
