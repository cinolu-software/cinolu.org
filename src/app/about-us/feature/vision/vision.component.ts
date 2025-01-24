import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'app-vision',
  imports: [CommonModule, TranslocoDirective],
  templateUrl: './vision.component.html'
})
export class VisionComponent {}
