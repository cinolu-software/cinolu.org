import { afterNextRender, Component, inject, OnInit, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from 'app/common/types/models.type';
import { CoachService } from './coachs.service';
import { TeamCardComponent } from '../../utils/slots/team-card/team-card.component';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { IAPIResponse } from '@core/services/api/types/api-response.type';

@Component({
  selector: 'app-coachs',
  imports: [CommonModule, CarouselModule, MatIconModule, TeamCardComponent],
  templateUrl: './coachs.component.html'
})
export class CoachComponent implements OnInit {
  coachs$: Observable<IAPIResponse<IUser[]>>;
  options: OwlOptions;
  isBrowser = signal<boolean>(false);
  #coachervice = inject(CoachService);

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
        },
        1040: {
          items: 5
        }
      }
    };
  }

  ngOnInit(): void {
    this.coachs$ = this.#coachervice.getCoachs();
  }
}
