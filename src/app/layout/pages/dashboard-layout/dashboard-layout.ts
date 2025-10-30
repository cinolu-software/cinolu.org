import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardSidebar } from '../../components/dashboard-sidebar/dashboard-sidebar';
import { DashboardTopbar } from '../../components/dashboard-topbar/dashboard-topbar';
import { BackButton } from '../../../common/components/back-button/back-button';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.html',
  imports: [RouterOutlet, DashboardTopbar, DashboardSidebar, BackButton],
})
export class DashboardLayout {}
