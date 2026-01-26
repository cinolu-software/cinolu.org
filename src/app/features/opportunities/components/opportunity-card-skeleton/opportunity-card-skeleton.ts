import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-opportunity-card-skeleton',
  imports: [CommonModule],
  templateUrl: './opportunity-card-skeleton.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OpportunityCardSkeleton {}
