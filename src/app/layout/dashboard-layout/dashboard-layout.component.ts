import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardSidebarComponent } from '../../shared/components/dashboard-sidebar/dashboard-sidebar.component';
import { DashboardTopbarComponent } from '../../shared/components/dashboard-topbar/dashboard-topbar.component';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  imports: [RouterOutlet, DashboardTopbarComponent, DashboardSidebarComponent]
})
export class DashboardLayoutComponent {}
