import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiImgPipe } from '../../../shared/pipes/api-img.pipe';
import { IEvent } from '../../../shared/utils/types/models.type';
import { LucideAngularModule, MapPin, CalendarX } from 'lucide-angular';

@Component({
  selector: 'app-event-card',
  imports: [LucideAngularModule, CommonModule, NgOptimizedImage, RouterLink, ApiImgPipe],
  templateUrl: './event-card.component.html',
})
export class EventCardComponent {
  event = input.required<IEvent>();
  icons = { MapPin, CalendarX };
}
