import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppTopbar } from '../../components/app-topbar/app-topbar';
import { Footer } from '../../components/footer/footer';
import { BackButton } from '../../../shared/components/back-button/back-button';

@Component({
  selector: 'app-full-layout',
  templateUrl: './full-layout.html',
  imports: [RouterOutlet, AppTopbar, Footer, BackButton],
})
export class FullLayout {}
