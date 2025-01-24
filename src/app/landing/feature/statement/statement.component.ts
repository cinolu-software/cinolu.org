import { Component } from '@angular/core';
import { innovationEcosystems } from '../../utils/data/statements';
import { NgOptimizedImage } from '@angular/common';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'app-statement',
  imports: [NgOptimizedImage, TranslocoDirective],
  templateUrl: './statement.component.html'
})
export class StatementComponent {
  innovationEcosystems = innovationEcosystems;
}
