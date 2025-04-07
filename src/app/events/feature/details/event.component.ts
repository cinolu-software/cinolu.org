import { CommonModule, Location, NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { IEvent } from 'app/shared/utils/types/models.type';
import { ActivatedRoute } from '@angular/router';
import { ApiImgPipe } from 'app/shared/pipes/api-img.pipe';
import { Observable } from 'rxjs';
import { IAPIResponse } from 'app/shared/services/api/types/api-response.type';
import { EventsService } from '../../data-access/events.service';
import { EventSkeletonComponent } from '../../ui/event-skeleton/event-skeleton.component';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-event',
  providers: [EventsService],
  imports: [CommonModule, EventSkeletonComponent, NgIcon, NgOptimizedImage, ApiImgPipe],
  templateUrl: './event.component.html'
})
export class EventComponent implements OnInit {
  event$: Observable<IAPIResponse<IEvent>>;
  #eventsService = inject(EventsService);
  #activatedRoute = inject(ActivatedRoute);
  #location = inject(Location);

  ngOnInit(): void {
    const slug = this.#activatedRoute.snapshot.paramMap.get('slug');
    this.event$ = this.#eventsService.getEvent(slug);
  }

  back(): void {
    this.#location.back();
  }
}
