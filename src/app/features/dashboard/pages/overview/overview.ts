import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthStore } from '@core/auth/auth.store';
import { VenturesStore } from '../../store/ventures.store';
import { ReferralsStore } from '@features/dashboard/store/referrals.store';

@Component({
  selector: 'app-dashboard-overview',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './overview.html'
})
export class DashboardOverview implements OnInit {
  authStore = inject(AuthStore);
  venturesStore = inject(VenturesStore);
  referralsStore = inject(ReferralsStore);

  ngOnInit() {
    this.venturesStore.loadAllVentures();
  }

  get recentVentures() {
    return this.venturesStore.ventures()?.slice(0, 3) || [];
  }

  getGreeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bonjour';
    if (hour < 18) return 'Bon après-midi';
    return 'Bonsoir';
  }
}
