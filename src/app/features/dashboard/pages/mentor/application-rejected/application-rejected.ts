import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IconComponent } from '@shared/ui';

@Component({
  selector: 'app-mentor-application-rejected',
  imports: [RouterModule, IconComponent],
  templateUrl: './application-rejected.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MentorApplicationRejected {}
