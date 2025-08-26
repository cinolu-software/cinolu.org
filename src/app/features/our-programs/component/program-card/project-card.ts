import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, MapPin, CalendarX } from 'lucide-angular';
import { ApiImgPipe } from '../../../../shared/pipes/api-img.pipe';
import { IProject } from '../../../../shared/models/entities.models';

@Component({
  selector: 'app-project-card',
  imports: [
    LucideAngularModule,
    CommonModule,
    NgOptimizedImage,
    RouterLink,
    ApiImgPipe,
  ],
  templateUrl: './project-card.html',
})
export class EventCard {
  program = input.required<IProject>();
  icons = { MapPin, CalendarX };
}
