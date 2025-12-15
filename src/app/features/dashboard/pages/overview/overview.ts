import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthStore } from '@core/auth/auth.store';
import { StatsStore } from '../../services/stats.store';
import { VenturesStore } from '../../services/ventures.store';

@Component({
  selector: 'app-dashboard-overview',
  standalone: true,
  imports: [CommonModule, RouterModule],
  providers: [StatsStore, VenturesStore],
  templateUrl: './overview.html'
})
export class DashboardOverview implements OnInit {
  authStore = inject(AuthStore);
  statsStore = inject(StatsStore);
  venturesStore = inject(VenturesStore);

  ngOnInit() {
    this.statsStore.loadUserStats();
    this.venturesStore.loadMyVentures({ page: 1 });
  }

  get recentVentures() {
    return this.venturesStore.ventures().slice(0, 3);
  }

  getGreeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bonjour';
    if (hour < 18) return 'Bon après-midi';
    return 'Bonsoir';
  }
}
