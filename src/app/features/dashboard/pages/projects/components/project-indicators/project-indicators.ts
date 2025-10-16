import { Component, inject, input } from '@angular/core';
import { IndicatorDto, IndicatorsComponent } from '../../../../components/indicators/indicators';
import { IProject } from '../../../../../../shared/models/entities.models';
import { AddIndicatorStore } from '../../store/projects/add-indicators.store';

@Component({
  selector: 'app-project-indicators',
  templateUrl: './project-indicators.html',
  providers: [AddIndicatorStore],
  imports: [IndicatorsComponent],
})
export class ProjectIndicators {
  project = input.required<IProject>();
  addIndicatorsStore = inject(AddIndicatorStore);

  onSaveIndicators(id: string, indicators: IndicatorDto[]): void {
    this.addIndicatorsStore.addIndicator({ id, indicators });
  }
}
