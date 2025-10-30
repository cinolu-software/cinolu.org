import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BackButton } from '../../../common/components/back-button/back-button';

@Component({
  selector: 'app-empty-layout',
  templateUrl: './empty-layout.html',
  imports: [RouterOutlet, BackButton],
})
export class EmptyLayout {}
