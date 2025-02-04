import { Component } from '@angular/core';
import { innovationEcosystems } from '../../utils/data/statements';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-statement',
  imports: [NgOptimizedImage],
  templateUrl: './statement.component.html'
})
export class StatementComponent {
  innovationEcosystems = innovationEcosystems;
}
