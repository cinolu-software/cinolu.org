import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, MapPin, CalendarX, MoveRight } from 'lucide-angular';
import { ApiImgPipe } from '../../../../shared/pipes/api-img.pipe';
import { IEvent } from '../../../../shared/models/entities.models';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-event-card',
  imports: [LucideAngularModule, CommonModule, NgOptimizedImage, RouterLink, ApiImgPipe, Button],
  templateUrl: './event-card.html',
})
export class EventCard {
  event = input.required<IEvent>();
  icons = { MapPin, CalendarX, MoveRight };
}
