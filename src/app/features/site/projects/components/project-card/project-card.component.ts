import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, CalendarCheck, CalendarX } from 'lucide-angular';
import { IProject } from '../../../../../shared/models/entities.models';
import { ApiImgPipe } from '../../../../../shared/pipes/api-img.pipe';

@Component({
  selector: 'app-project-card',
  imports: [
    LucideAngularModule,
    CommonModule,
    NgOptimizedImage,
    RouterLink,
    ApiImgPipe,
  ],
  templateUrl: './project-card.component.html',
})
export class ProjectCardComponent {
  project = input.required<IProject>();
  icons = { calendarCheck: CalendarCheck, calendarX: CalendarX };

  isFinished(project: IProject): boolean {
    return new Date(project.ended_at) <= new Date();
  }
}
