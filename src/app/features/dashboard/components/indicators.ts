import { Component, effect, input, output, signal } from '@angular/core';
import { LucideAngularModule, Plus, Trash2 } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { IIndicator } from '../../../shared/models/entities.models';

@Component({
  selector: 'app-indicators',
  imports: [LucideAngularModule, InputTextModule, FormsModule, CommonModule, ButtonModule],
  templateUrl: './indicators.html',
})
export class IndicatorsComponent {
  indicators = input<IIndicator[]>();
  indicatorsTab = signal<IIndicator[] | undefined>([]);
  saveIndicators = output<IIndicator[] | undefined>();
  icons = { trash: Trash2, plus: Plus };

  constructor() {
    effect(() => {
      if (this.indicators()?.length) this.indicatorsTab.set(this.indicators());
      else this.indicatorsTab.set([{ name: '', value: 0 }]);
    });
  }

  addIndicator(): void {
    this.indicatorsTab.update((indicators) => {
      if (!indicators) return;
      return [...indicators, { name: '', value: 0 }];
    });
  }

  removeIndicator(index: number): void {
    this.indicatorsTab.update((indicators) => {
      if (!indicators) return;
      return indicators.filter((_, i) => i !== index);
    });
  }

  onSaveIndicators(): void {
    this.saveIndicators.emit(this.indicatorsTab());
  }
}
