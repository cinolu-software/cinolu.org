import { CommonModule } from '@angular/common';
import { afterNextRender, Component, inject, OnInit, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { QueryObserverResult } from '@ngneat/query';
import { IUser } from 'app/common/types/models.type';
import { StaffService } from './staff.service';
import { TeamCardComponent } from '../../utils/slots/team-card/team-card.component';
import { MatIconModule } from '@angular/material/icon';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-staff',
  standalone: true,
  imports: [CommonModule, TeamCardComponent, MatIconModule, CarouselModule],
  templateUrl: './staff.component.html'
})
export class StaffComponent implements OnInit {
  staff$: Observable<QueryObserverResult<IUser[], Error>>;
  options: OwlOptions;
  isBrowser = signal<boolean>(false);
  #staffMembersService = inject(StaffService);

  constructor() {
    afterNextRender(() => this.isBrowser.set(true));
    this.options = {
      mouseDrag: false,
      touchDrag: false,
      loop: true,
      dots: false,
      nav: false,
      responsive: {
        0: {
          items: 1
        },
        740: {
          items: 2
        },
        940: {
          items: 4
        }
      }
    };
  }

  ngOnInit(): void {
    this.staff$ = this.#staffMembersService.getStaffMembers();
  }
}
