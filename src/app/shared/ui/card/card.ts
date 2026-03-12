import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'ui-card',
  template: `<section class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm" [class]="paddingClass()">
    <ng-content />
  </section>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {
  readonly paddingClass = input('p-6');
}
