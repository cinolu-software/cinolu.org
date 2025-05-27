import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { ApiImgPipe } from '../../../shared/pipes/api-img.pipe';
import { IEvent } from '../../../shared/utils/types/models.type';

@Component({
  selector: 'app-event-card',
  imports: [NgIcon, CommonModule, NgOptimizedImage, RouterLink, ApiImgPipe],
  templateUrl: './event-card.component.html',
})
export class EventCardComponent {
  event = input.required<IEvent>();
}
