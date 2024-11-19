import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IEvent } from 'app/common/types/models.type';
import { RouterLink } from '@angular/router';
import { ImgPipe } from 'app/common/pipes/img.pipe';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [MatIconModule, MatTooltipModule, CommonModule, NgOptimizedImage, RouterLink, ImgPipe],
  templateUrl: './event-card.component.html'
})
export class EventCardComponent {
  event = input.required<IEvent>();
}
