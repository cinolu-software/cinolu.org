import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { ApiImgPipe } from '../../../shared/pipes/api-img.pipe';
import { IUser } from '../../../shared/utils/types/models.type';

@Component({
  selector: 'app-team-card',
  imports: [CommonModule, ApiImgPipe],
  templateUrl: './team-card.component.html',
})
export class TeamCardComponent {
  user = input.required<IUser>();
}
