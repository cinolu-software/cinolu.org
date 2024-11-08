import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { ImgPipe } from 'app/common/pipes/img.pipe';
import { IUser } from 'app/common/types/models.type';

@Component({
  selector: 'app-team-card',
  standalone: true,
  imports: [CommonModule, ImgPipe],
  templateUrl: './team-card.component.html'
})
export class TeamCardComponent {
  user = input.required<IUser>();
}
