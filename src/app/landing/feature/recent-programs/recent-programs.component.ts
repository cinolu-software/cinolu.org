import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IAPIResponse } from '../../../shared/services/api/types/api-response.type';
import { IProgram } from '../../../shared/utils/types/models.type';
import { ProgramsService } from '../../../programs/data-access/programs.service';
import { CommonModule } from '@angular/common';
import { ProgramCardComponent } from '../../../shared/ui/program-card/program-card.component';
import { ProgramCardSkeletonComponent } from '../../../shared/ui/program-card-skeleton/program-card-skeleton.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-recent-programs',
  providers: [ProgramsService],
  imports: [CommonModule, ProgramCardComponent, ProgramCardSkeletonComponent, RouterModule, MatIconModule],
  templateUrl: './recent-programs.component.html'
})
export class RecentProgramsComponent implements OnInit {
  programs$: Observable<IAPIResponse<IProgram[]>>;
  #programsService = inject(ProgramsService);

  ngOnInit(): void {
    this.programs$ = this.#programsService.findRecent();
  }
}
