import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { team } from '../../data/team';
import { ObserveVisibilityDirective } from 'app/common/directives/observer.directive';
import { TeamService } from './team.service';
import { Observable } from 'rxjs';
import { QueryObserverResult } from '@ngneat/query';
import { IUser } from '../../../../common/types/models.type';
import { environment } from '../../../../../environments/environment';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [NgOptimizedImage, ObserveVisibilityDirective, CommonModule, CarouselModule],
  templateUrl: './team.component.html'
})
export class TeamComponent implements OnInit {
  team = team;
  staff$: Observable<QueryObserverResult<IUser[], Error>>;
  coachs$: Observable<QueryObserverResult<IUser[], Error>>;
  owlOptions: OwlOptions = {
    dots: false,
    nav: true,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    }
  };

  #teamService = inject(TeamService);

  ngOnInit(): void {
    this.staff$ = this.#teamService.getTeamMember('staff');
    this.coachs$ = this.#teamService.getTeamMember('coach');
  }

  displayProfileImage(user: IUser): string {
    return user.profile
      ? `${environment.apiUrl}uploads/profiles/${user.profile}`
      : user.google_image || '/images/avatar-default.webp';
  }
}
