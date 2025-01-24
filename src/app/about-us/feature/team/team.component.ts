import { afterNextRender, Component, inject, OnInit, signal } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { combineLatest, Observable } from 'rxjs';
import { IAPIResponse } from 'app/shared/services/api/types/api-response.type';
import { IUser } from 'app/shared/utils/types/models.type';
import { TeamService } from '../../data-access/team.service';
import { owlOptionsTeam } from '../../utils/config/owl.config';
import { TeamCardComponent } from '../../ui/team-card/team-card.component';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'app-team',
  providers: [TeamService],
  imports: [CommonModule, CarouselModule, MatIconModule, TeamCardComponent, TranslocoDirective],
  templateUrl: './team.component.html'
})
export class TeamComponent implements OnInit {
  isBrowser = signal<boolean>(false);
  team$: Observable<[IAPIResponse<IUser[]>, IAPIResponse<IUser[]>]>;
  owlOptions = owlOptionsTeam;
  #teamService = inject(TeamService);

  constructor() {
    afterNextRender(() => this.isBrowser.set(true));
  }

  ngOnInit(): void {
    this.team$ = combineLatest([this.#teamService.getStaffMembers(), this.#teamService.getCoachs()]);
  }
}
