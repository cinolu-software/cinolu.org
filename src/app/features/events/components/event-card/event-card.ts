import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, MoveRight, CalendarCheck, CalendarX } from 'lucide-angular';
import { ApiImgPipe } from '../../../../shared/pipes/api-img.pipe';
import { IEvent } from '../../../../shared/models/entities.models';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-event-card',
  imports: [LucideAngularModule, CommonModule, NgOptimizedImage, RouterLink, ApiImgPipe, Button],
  templateUrl: './event-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventCard {
  event = input.required<IEvent>();
  icons = { MoveRight, CalendarCheck, CalendarX };
}
