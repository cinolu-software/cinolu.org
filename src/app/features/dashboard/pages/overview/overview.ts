import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthStore } from '@core/auth/auth.store';
import { VenturesStore } from '../../store/ventures.store';
import { ReferralsStore } from '@features/dashboard/store/referrals.store';
import { ProductsStore } from '../../store/products.store';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-dashboard-overview',
  standalone: true,
  imports: [CommonModule, RouterModule, BaseChartDirective],
  templateUrl: './overview.html'
})
export class DashboardOverview implements OnInit {
  authStore = inject(AuthStore);
  venturesStore = inject(VenturesStore);
  referralsStore = inject(ReferralsStore);
  productsStore = inject(ProductsStore);

  // Configuration du graphique de progression
  public doughnutChartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: ['Complété', 'Restant'],
    datasets: [
      {
        data: [0, 100],
        backgroundColor: ['#5d9c46', '#e5e7eb'],
        borderWidth: 0
      }
    ]
  };

  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '75%',
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: false
      }
    }
  };

  ngOnInit() {
    this.venturesStore.loadAllVentures();
    this.productsStore.loadAllProducts();
    this.updateProfileCompletion();
  }

  get recentVentures() {
    return this.venturesStore.ventures()?.slice(0, 3) || [];
  }

  get productsCount() {
    return this.productsStore.products()?.length || 0;
  }

  /**
   * Calcule le pourcentage de complétion du profil utilisateur
   * en fonction des champs remplis
   */
  calculateProfileCompletion(): number {
    const user = this.authStore.user();
    if (!user) return 0;

    const fields = [
      user.name,
      user.email,
      user.phone_number,
      user.profile,
      user.city,
      user.country,
      user.biography,
      user.gender,
      user.birth_date
    ];

    const filledFields = fields.filter((field) => field && field.toString().trim() !== '').length;
    const totalFields = fields.length;

    return Math.round((filledFields / totalFields) * 100);
  }

  updateProfileCompletion() {
    const completion = this.calculateProfileCompletion();
    this.doughnutChartData.datasets[0].data = [completion, 100 - completion];
  }

  get profileCompletion(): number {
    return this.calculateProfileCompletion();
  }

  getGreeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bonjour';
    if (hour < 18) return 'Bon après-midi';
    return 'Bonsoir';
  }
}
