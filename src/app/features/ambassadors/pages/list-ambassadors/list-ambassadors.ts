import { Component, inject, OnInit, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { AmbassadorsStore } from '../../store/ambassadors.store';
import { getAmbassadorLevel, getInitials } from '../../../../shared/helpers/ambassador.helpers';
import { environment } from '../../../../../environments/environment';
import { IUser } from '../../../../shared/models';
import { HeroCard } from 'src/app/layout/components/hero-card/hero-card';
import { ArrowLeft, ArrowRight, Edit, LucideAngularModule, MapPin, Star, Users } from 'lucide-angular';
import { AmbassadorCard } from '../../components/ambassador-card/ambassador-card';
import { AmbassadorSkeleton } from '../../components/ambassador-skeleton/ambassador-skeleton';

@Component({
  selector: 'app-list-ambassadors',
  standalone: true,
  imports: [CommonModule, TranslateModule, HeroCard, LucideAngularModule, AmbassadorCard, AmbassadorSkeleton],
  providers: [AmbassadorsStore],
  templateUrl: './list-ambassadors.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListAmbassadors implements OnInit {
  store = inject(AmbassadorsStore);

  icons = {
    edit: Edit,
    users: Users,
    star: Star,
    mapPin: MapPin,
    arrowLeft: ArrowLeft,
    arrowRight: ArrowRight
  };

  currentPage = 1;
  limit = 20;

  // Computed signals pour accéder aux données du store
  ambassadorsList = computed(() => this.store.ambassadors()[0]);
  totalAmbassadors = computed(() => this.store.ambassadors()[1]);

  totalPages = computed(() => {
    return Math.ceil(this.totalAmbassadors() / this.limit);
  });

  visiblePages = computed(() => {
    const current = this.currentPage;
    const total = this.totalPages();
    const delta = 2;
    const range: number[] = [];

    for (let i = Math.max(2, current - delta); i <= Math.min(total - 1, current + delta); i++) {
      range.push(i);
    }

    if (current - delta > 2) {
      range.unshift(-1);
    }
    if (current + delta < total - 1) {
      range.push(-1);
    }

    range.unshift(1);
    if (total > 1) {
      range.push(total);
    }

    return range.filter((v, i, a) => a.indexOf(v) === i && v !== -1);
  });

  ngOnInit(): void {
    this.store.loadAmbassadors({ page: this.currentPage, limit: this.limit });
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages() || page === this.currentPage) {
      return;
    }

    this.currentPage = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.store.loadAmbassadors({ page: this.currentPage, limit: this.limit });
  }

  getAvatarUrl(profile: string): string {
    if (!profile) return '';
    if (profile.startsWith('http://') || profile.startsWith('https://')) {
      return profile;
    }
    return `${environment.apiUrl}uploads/${profile}`;
  }

  getInitials(name: string): string {
    return getInitials(name);
  }

  getAmbassadorBadge(referralsCount?: number) {
    return getAmbassadorLevel(referralsCount);
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.style.display = 'none';
  }

  trackByAmbassadorId(_index: number, ambassador: IUser): string {
    return ambassador.id;
  }
}
