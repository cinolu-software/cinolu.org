import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  LucideAngularModule,
  CalendarCheck,
  CalendarX,
  MoveRight,
} from 'lucide-angular';
import { IProject } from '../../../../shared/models/entities.models';
import { ApiImgPipe } from '../../../../shared/pipes/api-img.pipe';

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
export class ProjectCard {
  project = input.required<IProject>();
  icons = {
    calendarCheck: CalendarCheck,
    calendarX: CalendarX,
    moveRight: MoveRight,
  };
}
