import { Component } from '@angular/core';
import { statements } from '../../utils/data/statements';

@Component({
  selector: 'app-statement',
  imports: [],
  templateUrl: './statement.component.html'
})
export class StatementComponent {
  statements = statements;
}
