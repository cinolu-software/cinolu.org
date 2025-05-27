import { CommonModule, Location, NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { EventsService } from '../../data-access/events.service';
import { EventSkeletonComponent } from '../../ui/event-skeleton/event-skeleton.component';
import { NgIcon } from '@ng-icons/core';
import { ApiImgPipe } from '../../../shared/pipes/api-img.pipe';
import { IAPIResponse } from '../../../shared/services/api/types/api-response.type';
import { IEvent } from '../../../shared/utils/types/models.type';
import { FooterComponent } from '../../../shared/layout/ui/footer/footer.component';

@Component({
  selector: 'app-event',
  providers: [EventsService],
  imports: [CommonModule, EventSkeletonComponent, NgIcon, NgOptimizedImage, ApiImgPipe, FooterComponent],
  templateUrl: './event.component.html',
})
export class EventComponent implements OnInit {
  event$: Observable<IAPIResponse<IEvent>> | undefined;
  #eventsService = inject(EventsService);
  #route = inject(ActivatedRoute);
  #location = inject(Location);
  #slug = this.#route.snapshot.paramMap.get('id') || '';

  ngOnInit(): void {
    this.event$ = this.#eventsService.getEvent(this.#slug);
  }

  back(): void {
    this.#location.back();
  }
}
