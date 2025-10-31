import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-empty-state',
  imports: [LucideAngularModule],
  templateUrl: './empty-state.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmptyState {
  icon = input.required<string>();
  title = input.required<string>();
  description = input.required<string>();
  showAction = input(true);
}
