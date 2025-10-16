import { Component, inject, input } from '@angular/core';
import { IndicatorDto, IndicatorsComponent } from '../../../../components/indicators/indicators';
import { AddIndicatorStore } from '../../store/events/add-indicators.store';
import { IEvent } from '../../../../../../shared/models/entities.models';

@Component({
  selector: 'app-event-indicators',
  templateUrl: './event-indicators.html',
  providers: [AddIndicatorStore],
  imports: [IndicatorsComponent],
})
export class EventIndicators {
  event = input.required<IEvent>();
  addIndicatorsStore = inject(AddIndicatorStore);

  onSaveIndicators(id: string, indicators: IndicatorDto[]): void {
    this.addIndicatorsStore.addIndicator({ id, indicators });
  }
}
