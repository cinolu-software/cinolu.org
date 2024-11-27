import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { APIImgPipe } from 'app/shared/pipes/api-img.pipe';
import { IUser } from 'app/shared/utils/types/models.type';

@Component({
  selector: 'app-team-card',
  imports: [CommonModule, APIImgPipe],
  templateUrl: './team-card.component.html'
})
export class TeamCardComponent {
  user = input.required<IUser>();
}
