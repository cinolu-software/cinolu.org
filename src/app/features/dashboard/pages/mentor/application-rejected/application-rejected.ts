import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-mentor-application-rejected',
  imports: [RouterModule],
  templateUrl: './application-rejected.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MentorApplicationRejected {}
