import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingBar } from './shared/components/loading-bar/loading-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [RouterOutlet, LoadingBar],
})
export class App {}
