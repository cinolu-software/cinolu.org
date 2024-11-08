import { CommonModule, Location, NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ObservableQueryResult } from '@ngneat/query';
import { IEvent } from 'app/common/types/models.type';
import { EventService } from './event.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ImgPipe } from 'app/common/pipes/img.pipe';
import { EventCardComponent } from '../../components/event-card/event-card.component';
import { EventCardSkeletonComponent } from '../../components/event-card-skeleton/event-card-skeleton.component';

@Component({
  selector: 'app-program',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    EventCardComponent,
    MatIconModule,
    MatButtonModule,
    EventCardSkeletonComponent,
    NgOptimizedImage,
    ImgPipe
  ],
  templateUrl: './event.component.html'
})
export class EventComponent implements OnInit {
  event$: ObservableQueryResult<IEvent, Error>;
  #detailsProgramService = inject(EventService);
  #activatedRoute = inject(ActivatedRoute);
  #location = inject(Location);

  ngOnInit(): void {
    const id = this.#activatedRoute.snapshot.paramMap.get('id');
    this.event$ = this.#detailsProgramService.getEvent(id);
  }

  back(): void {
    this.#location.back();
  }
}
