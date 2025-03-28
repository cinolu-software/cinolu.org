import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';
import { IEvent } from 'app/shared/utils/types/models.type';
import { RouterLink } from '@angular/router';
import { ApiImgPipe } from 'app/shared/pipes/api-img.pipe';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-event-card',
  imports: [NgIcon, CommonModule, NgOptimizedImage, RouterLink, ApiImgPipe],
  templateUrl: './event-card.component.html'
})
export class EventCardComponent {
  event = input.required<IEvent>();
}
