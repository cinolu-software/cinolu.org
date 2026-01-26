import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, inject, signal, computed } from '@angular/core';
import {
  LucideAngularModule,
  CalendarDays,
  Tag,
  Share2,
  ChevronUp,
  Info,
  ExternalLink,
  FileText,
  Download,
  Clock
} from 'lucide-angular';
import { OpportunityStore } from '../../store/opportunity.store';
import { ActivatedRoute, Router } from '@angular/router';
import { IOpportunity } from '../../../../shared/models/entities.models';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { openExternalUrl } from '@shared/helpers';
import { Button } from 'primeng/button';
import { environment } from '@environments/environment';
import { AuthStore } from '@core/auth/auth.store';
import { ToastrService } from '@core/services/toast/toastr.service';

@Component({
  selector: 'app-opportunity',
  providers: [OpportunityStore],
  imports: [CommonModule, LucideAngularModule, TranslateModule, Button],
  templateUrl: './detail-opportunity.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailOpportunity implements OnInit {
  activeSection = signal<string | null>(null);
  expandedDescription = computed(() => this.activeSection() === 'description');

  icons = {
    calendarDays: CalendarDays,
    tag: Tag,
    share: Share2,
    chevronUp: ChevronUp,
    info: Info,
    externalLink: ExternalLink,
    fileText: FileText,
    download: Download,
    clock: Clock
  };

  readonly #route = inject(ActivatedRoute);
  readonly #router = inject(Router);
  readonly #authStore = inject(AuthStore);
  readonly #toastService = inject(ToastrService);
  readonly #translate = inject(TranslateService);
  readonly store = inject(OpportunityStore);
  readonly opportunity = computed(() => this.store.opportunity());

  ngOnInit(): void {
    const slug = this.#route.snapshot.params['slug'];
    this.store.loadOpportunity(slug);
  }

  getStatus(opportunity: IOpportunity): string {
    const now = new Date();
    const startedAt = new Date(opportunity.started_at);
    const endedAt = new Date(opportunity.ended_at);
    if (startedAt <= now && endedAt >= now) return 'En cours';
    if (startedAt > now) return 'À venir';
    return 'Terminée';
  }

  toggleDescription() {
    this.activeSection.set(this.activeSection() === 'description' ? null : 'description');
  }

  openLink(url?: string) {
    // Vérifier si l'utilisateur est connecté
    if (!this.#authStore.user()) {
      // Afficher un message et rediriger vers sign-in avec returnUrl
      this.#toastService.showError(this.#translate.instant('opportunities.login_to_apply'));

      const currentUrl = this.#router.url;
      this.#router.navigate(['/sign-in'], { queryParams: { returnUrl: currentUrl } });
      return;
    }

    // Si connecté, ouvrir le lien normalement
    openExternalUrl(url);
  }

  downloadAttachment(filename: string) {
    const url = `${environment.apiUrl}/uploads/opportunities/attachments/${filename}`;
    window.open(url, '_blank');
  }

  getDaysLeft(opportunity: IOpportunity): number {
    const now = new Date();
    const end = new Date(opportunity.ended_at);
    const diffTime = end.getTime() - now.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  async shareOpportunity() {
    const opportunity = this.opportunity();
    if (!opportunity) return;

    interface LocalShareData {
      title?: string;
      text?: string;
      url?: string;
    }

    const shareData: LocalShareData = {
      title: opportunity.title,
      text: (opportunity.description || '').slice(0, 200),
      url: typeof window !== 'undefined' ? window.location.href : ''
    };

    try {
      const nav = navigator as unknown as { share?: (data: LocalShareData) => Promise<void> };
      if (nav.share) {
        await nav.share(shareData);
      } else if (typeof window !== 'undefined') {
        const body = encodeURIComponent(`${shareData.text}\n\n${shareData.url}`);
        window.open(`mailto:?subject=${encodeURIComponent(shareData.title || '')}&body=${body}`, '_blank');
      }
    } catch {
      // ignore
    }
  }

  isOngoing(opportunity: IOpportunity | null | undefined): boolean {
    return !!opportunity && this.getStatus(opportunity) === 'En cours';
  }

  isUpcoming(opportunity: IOpportunity | null | undefined): boolean {
    return !!opportunity && this.getStatus(opportunity) === 'À venir';
  }

  isPast(opportunity: IOpportunity | null | undefined): boolean {
    return !!opportunity && this.getStatus(opportunity) === 'Terminée';
  }

  getStatusBadgeClasses(opportunity: IOpportunity | null | undefined): string {
    if (this.isOngoing(opportunity)) return 'bg-green-50 border-green-100 text-green-700';
    if (this.isUpcoming(opportunity)) return 'bg-blue-50 border-blue-100 text-blue-700';
    return 'bg-gray-50 border-gray-100 text-gray-700';
  }
}
