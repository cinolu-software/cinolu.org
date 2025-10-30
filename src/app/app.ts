import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingBar } from './layout/components/loading-bar/loading-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [RouterOutlet, LoadingBar],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {}
