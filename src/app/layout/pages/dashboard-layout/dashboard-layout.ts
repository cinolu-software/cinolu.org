import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardSidebar } from '../../components/dashboard-sidebar/dashboard-sidebar';
import { DashboardTopbar } from '../../components/dashboard-topbar/dashboard-topbar';
import { BackButton } from '../../../shared/components/back-button/back-button';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.html',
  imports: [RouterOutlet, DashboardTopbar, DashboardSidebar, BackButton],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardLayout {}
