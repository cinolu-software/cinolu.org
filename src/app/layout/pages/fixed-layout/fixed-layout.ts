import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppTopbar } from '../../components/app-topbar/app-topbar';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-fixed-topbar-layout',
  templateUrl: './fixed-layout.html',
  imports: [RouterOutlet, Footer, AppTopbar],
})
export class FixedLayout {}
