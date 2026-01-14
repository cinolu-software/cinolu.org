import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-mentor-application-rejected',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './application-rejected.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MentorApplicationRejected {}
