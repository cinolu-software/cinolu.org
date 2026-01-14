import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-mentor-application-pending',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './application-pending.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MentorApplicationPending {}
