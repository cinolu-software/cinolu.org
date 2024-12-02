import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { ApiImgPipe } from 'app/shared/pipes/api-img.pipe';
import { IUser } from 'app/shared/utils/types/models.type';

@Component({
  selector: 'app-team-card',
  imports: [CommonModule, ApiImgPipe],
  templateUrl: './team-card.component.html'
})
export class TeamCardComponent {
  user = input.required<IUser>();
}
