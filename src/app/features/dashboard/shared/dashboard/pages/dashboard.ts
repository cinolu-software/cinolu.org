import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { AdminStatsStore } from '../store/admin-stats.store';
import { AuthStore } from '../../../../../core/auth/auth.store';
import { AdminStats } from '../components/admin-stats/admin-stats';
import { UserStats } from '../components/user-stats/user-stats';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  providers: [AdminStatsStore],
  imports: [
    ButtonModule,
    InputTextModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ConfirmPopupModule,
    AdminStats,
    UserStats,
  ],
})
export class Dashboard {
  authStore = inject(AuthStore);
  isAdmin = signal<boolean>(false);

  constructor() {
    effect(() => {
      const roles = this.authStore.user()?.roles as unknown as string[];
      const isAdmin = roles.includes('admin') || roles.includes('staff');
      this.isAdmin.set(isAdmin);
    });
  }
}
