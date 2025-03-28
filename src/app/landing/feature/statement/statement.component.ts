import { Component } from '@angular/core';
import { innovationEcosystems } from '../../utils/data/statements.data';

@Component({
  selector: 'app-statement',
  imports: [],
  templateUrl: './statement.component.html'
})
export class StatementComponent {
  innovationEcosystems = innovationEcosystems;
}
