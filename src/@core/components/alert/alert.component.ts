import { Component, HostBinding, ViewEncapsulation, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Animations } from '@core/animations';
import { AlertAppearance, AlertType } from '@core/components/alert/alert.types';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: Animations,
  imports: [MatIconModule, MatButtonModule]
})
export class AlertComponent {
  appearance = input<AlertAppearance>('soft');
  name = input<string>(String(Date.now()));
  showIcon = input<boolean>(true);
  type = input<AlertType>('primary');

  @HostBinding('class') get classList() {
    return {
      'alert-appearance-border': this.appearance() === 'border',
      'alert-appearance-fill': this.appearance() === 'fill',
      'alert-appearance-outline': this.appearance() === 'outline',
      'alert-appearance-soft': this.appearance() === 'soft',
      'alert-show-icon': this.showIcon,
      'alert-type-primary': this.type() === 'primary',
      'alert-type-accent': this.type() === 'accent',
      'alert-type-warn': this.type() === 'warn',
      'alert-type-basic': this.type() === 'basic',
      'alert-type-info': this.type() === 'info',
      'alert-type-success': this.type() === 'success',
      'alert-type-warning': this.type() === 'warning',
      'alert-type-error': this.type() === 'error'
    };
  }
}
