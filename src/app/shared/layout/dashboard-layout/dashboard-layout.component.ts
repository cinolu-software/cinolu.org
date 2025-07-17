import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardTopbarComponent } from '../../components/dashboard-topbar/dashboard-topbar.component';
import { DashboardSidebarComponent } from '../../components/sidebar/dashboard-sidebar.component';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  imports: [RouterOutlet, DashboardTopbarComponent, DashboardSidebarComponent],
})
export class DashboardLayoutComponent {}
