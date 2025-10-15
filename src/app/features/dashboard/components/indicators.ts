import { Component, effect, input, output, signal } from '@angular/core';
import { LucideAngularModule, Plus, Trash2 } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { IndicatorDto } from '../dto/indicator.dto';

@Component({
  selector: 'app-indicators',
  imports: [LucideAngularModule, InputTextModule, FormsModule, CommonModule, ButtonModule],
  templateUrl: './indicators.html',
})
export class IndicatorsComponent {
  indicators = input.required<IndicatorDto[]>();
  isLoading = input.required<boolean>();
  indicatorsTab = signal<IndicatorDto[]>([]);
  saveIndicators = output<IndicatorDto[]>();
  icons = { trash: Trash2, plus: Plus };

  constructor() {
    effect(() => {
      if (this.indicators()?.length) this.indicatorsTab.set(this.indicators());
      else this.indicatorsTab.set([{ name: '', value: 0 }]);
    });
  }

  addIndicator(): void {
    this.indicatorsTab.update((indicators) => [...indicators, { name: '', value: 0 }]);
  }

  removeIndicator(index: number): void {
    this.indicatorsTab.update((indicators) => indicators.filter((_, i) => i !== index));
  }

  onSaveIndicators(): void {
    this.saveIndicators.emit(this.indicatorsTab());
  }
}
