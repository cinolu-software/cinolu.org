import { CommonModule } from '@angular/common';
import { Component, inject,  } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import {
  Book,
  BookOpen,
  Calendar,
  FileText,
  Layers,
  LucideAngularModule,
  Newspaper,
  User,
  Users,
} from 'lucide-angular';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DashboardStore } from '../store/dashboard.store';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  providers: [DashboardStore],
  imports: [
    ButtonModule,
    InputTextModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    LucideAngularModule,
    NgxPaginationModule,
    ConfirmPopupModule,
  ],
})
export class Dashboard {
  store = inject(DashboardStore);
  icons = {
    user: User,
    users: Users,
    bookOpen: BookOpen,
    book: Book,
    file: FileText,
    layers: Layers,
    calendar: Calendar,
    newsPaper: Newspaper,
  };
}
