import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { IProgram } from 'app/common/types/models.type';
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
  #programService = inject(ProgramService);
  #activatedRoute = inject(ActivatedRoute);
  activeTab = signal<'overview' | 'application'>('overview');

  ngOnInit(): void {
    const id = this.#activatedRoute.snapshot.paramMap.get('id');
    this.program$ = this.#programService.getProgram(id);
  }

  setActiveTab(tab: 'overview' | 'application'): void {
    this.activeTab.set(tab);
  }
}
