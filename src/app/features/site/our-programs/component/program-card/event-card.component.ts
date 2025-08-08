import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, MapPin, CalendarX } from 'lucide-angular';
import { ApiImgPipe } from '../../../../../shared/pipes/api-img.pipe';
import { IEvent } from '../../../../../shared/models/entities.models';

@Component({
  selector: 'app-event-card',
  imports: [
    LucideAngularModule,
    CommonModule,
    NgOptimizedImage,
    RouterLink,
    ApiImgPipe,
  ],
  templateUrl: './event-card.component.html',
})
export class EventCardComponent {
  event = input.required<IEvent>();
  icons = { MapPin, CalendarX };
}
