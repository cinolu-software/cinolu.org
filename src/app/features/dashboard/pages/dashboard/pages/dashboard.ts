import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { AdminStatsStore } from '../store/admin-stats.store';
import { AuthStore } from '../../../../../core/auth/auth.store';
import { UserStats } from '../components/user-stats/user-stats';
import { DatePicker } from 'primeng/datepicker';
import { AdminReportStore } from '../store/admin-report.store';
import { ProgramReport } from '../types/stats.type';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  providers: [AdminStatsStore, AdminReportStore],
  imports: [
    ButtonModule,
    InputTextModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ConfirmPopupModule,
    DatePicker,
    FormsModule,
    UserStats
  ]
})
export class Dashboard {
  authStore = inject(AuthStore);
  isAdmin = signal<boolean>(false);
  reportStore = inject(AdminReportStore);
  year = signal<Date>(new Date());
  selectedYear = computed(() => this.year().getFullYear());
  totalIndicators = computed(() => {
    return this.reportStore.report().reduce((sum, program) => {
      return sum + program.indicators.length;
    }, 0);
  });

  averagePerformance = computed(() => {
    const reports = this.reportStore.report();
    if (reports.length === 0) return 0;
    const totalPerformance = reports.reduce((sum, program) => {
      return sum + program.performance;
    }, 0);
    return Math.round(totalPerformance / reports.length);
  });

  calculateTotalTarget(program: ProgramReport): number {
    return program.indicators.reduce((sum, indicator) => {
      return sum + (indicator.target ?? 0);
    }, 0);
  }

  calculateTotalAchieved(program: ProgramReport): number {
    return program.indicators.reduce((sum, indicator) => {
      return sum + indicator.achieved;
    }, 0);
  }

  constructor() {
    effect(() => {
      const roles = this.authStore.user()?.roles as unknown as string[];
      const isAdmin = roles.includes('admin') || roles.includes('staff');
      this.isAdmin.set(isAdmin);
      if (isAdmin && this.selectedYear()) this.reportStore.getAdminReport(this.selectedYear());
    });
  }
}
