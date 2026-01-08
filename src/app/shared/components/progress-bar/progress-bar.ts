import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProgressBarModule } from 'primeng/progressbar';
import { KnobModule } from 'primeng/knob';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [CommonModule, FormsModule, ProgressBarModule, KnobModule],
  templateUrl: './progress-bar.html',
  styleUrl: './progress-bar.css'
})
export class ProgressBarComponent {
  value = input<number>(0);
  max = input<number>(100);
  label = input<string>();
  color = input<'primary' | 'success' | 'warning' | 'danger' | 'info'>('primary');
  type = input<'linear' | 'circular'>('linear');
  size = input<'normal' | 'large'>('normal');

  getProgressBarClass(): string {
    return `progress-${this.color()}`;
  }

  getKnobColor(): string {
    const colors = {
      primary: '#3b82f6',
      success: '#10b981',
      warning: '#f59e0b',
      danger: '#ef4444',
      info: '#06b6d4'
    };
    return colors[this.color()];
  }
}
