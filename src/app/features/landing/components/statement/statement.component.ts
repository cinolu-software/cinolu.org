import { Component } from '@angular/core';
import { STATEMENTS } from '../../data/statements.data';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-statement',
  imports: [NgOptimizedImage],
  templateUrl: './statement.component.html'
})
export class StatementComponent {
  statements = STATEMENTS;
}
