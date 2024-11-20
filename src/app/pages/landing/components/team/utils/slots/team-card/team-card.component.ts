import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { APIImgPipe } from 'app/common/pipes/api-img.pipe';
import { IUser } from 'app/common/types/models.type';

@Component({
  selector: 'app-team-card',
  imports: [CommonModule, APIImgPipe],
  templateUrl: './team-card.component.html'
})
export class TeamCardComponent {
  user = input.required<IUser>();
}
