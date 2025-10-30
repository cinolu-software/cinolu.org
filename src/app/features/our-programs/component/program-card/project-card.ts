import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, MapPin, CalendarX } from 'lucide-angular';
import { ApiImgPipe } from '../../../../common/pipes/api-img.pipe';
import { IProject } from '../../../../common/models/entities.models';
import { QuillViewComponent } from 'ngx-quill';

@Component({
  selector: 'app-project-card',
  imports: [LucideAngularModule, CommonModule, NgOptimizedImage, RouterLink, ApiImgPipe, QuillViewComponent],
  templateUrl: './project-card.html',
})
export class EventCard {
  program = input.required<IProject>();
  icons = { MapPin, CalendarX };
}
