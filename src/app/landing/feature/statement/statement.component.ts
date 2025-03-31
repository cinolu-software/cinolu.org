import { Component } from '@angular/core';
import { statements } from '../../utils/data/statements.data';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-statement',
  imports: [NgIcon],
  templateUrl: './statement.component.html'
})
export class StatementComponent {
  statements = statements;
}
