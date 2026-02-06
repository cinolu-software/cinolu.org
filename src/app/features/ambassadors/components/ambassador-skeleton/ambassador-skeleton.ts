import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ambassador-skeleton',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ambassador-skeleton.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AmbassadorSkeleton {}
