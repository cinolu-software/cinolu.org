import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-mentor-application-pending',
  imports: [RouterModule],
  templateUrl: './application-pending.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MentorApplicationPending {}
