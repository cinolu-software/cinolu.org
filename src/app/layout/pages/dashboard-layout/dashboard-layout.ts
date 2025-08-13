import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardSidebar } from '../../components/dashboard-sidebar/dashboard-sidebar';
import { DashboardTopbar } from '../../components/dashboard-topbar/dashboard-topbar';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.html',
  imports: [RouterOutlet, DashboardTopbar, DashboardSidebar],
})
export class DashboardLayout {}
