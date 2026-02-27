import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, OnInit, ChangeDetectionStrategy, signal } from '@angular/core';
import { ProjectSkeleton } from '../../components/project-skeleton/project-skeleton';
import {
  LucideAngularModule,
  FileText,
  CalendarDays,
  CalendarCheck,
  Tag,
  CalendarSync,
  Share2,
  ChevronUp,
  Target,
  Info,
  Hourglass,
  CheckCircle2,
  Users,
  SquaresSubtract,
  UserPlus,
  AlertCircle,
  Home,
  ArrowLeft,
  Search,
  Layers,
  ThumbsUp
} from 'lucide-angular';
import { ProjectStore } from '../../store/project.store';
import { formatDateForGoogleCalendarUTC, openExternalUrl } from '@shared/helpers';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiImgPipe } from '../../../../shared/pipes/api-img.pipe';
import { GalleriaModule } from 'primeng/galleria';
import { carouselConfig } from '../../../landing/config/carousel.config';
import { TranslateModule } from '@ngx-translate/core';
import { AuthStore } from '@core/auth/auth.store';
import { AuthRequiredModalComponent } from '@shared/components/auth-required-modal/auth-required-modal';
import { ParticipationsStore } from '../../../dashboard/store/participations.store';
import { VoteStore } from '../../../dashboard/store/vote.store';
import { ParticipationCards } from '../../components/participation-cards/participation-cards';

@Component({
  selector: 'app-project-detail',
  providers: [ProjectStore, VoteStore],
  imports: [
    CommonModule,
    ApiImgPipe,
    ProjectSkeleton,
    LucideAngularModule,
    GalleriaModule,
    TranslateModule,
    RouterLink,
    ParticipationCards,
    AuthRequiredModalComponent
  ],
  templateUrl: './detail-project.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailProject implements OnInit {
  #route = inject(ActivatedRoute);
  #router = inject(Router);
  store = inject(ProjectStore);
  participationsStore = inject(ParticipationsStore);
  authStore = inject(AuthStore);

  activeSection = signal<string | null>(null);
  showAuthModal = signal(false);
  returnUrl = computed(() => this.#router.url.split('?')[0] || '/');
  /** Évite de recharger les participations en boucle (effet + rxMethod). */
  private lastLoadedProjectId = signal<string | null>(null);

  constructor() {
    effect(() => {
      const project = this.store.project();
      const id = project?.id ?? null;
      if (!id || id === this.lastLoadedProjectId()) return;
      this.lastLoadedProjectId.set(id);
      this.participationsStore.loadProjectParticipations(id);
    });
  }

  expandedDescription = computed(() => this.activeSection() === 'description');
  expandedCriteria = computed(() => this.activeSection() === 'criteria');
  expandedObjectives = computed(() => this.activeSection() === 'objectives');
  expandedContext = computed(() => this.activeSection() === 'context');

  projectStatus = computed(() => {
    const project = this.store.project();
    if (!project) return null;

    const now = new Date();
    const startedAt = new Date(project.started_at);
    const endedAt = new Date(project.ended_at);

    if (startedAt <= now && endedAt >= now) {
      return 'En cours';
    } else if (startedAt > now) {
      return 'À venir';
    } else {
      return 'Terminé';
    }
  });

  isProjectOpen = computed(() => {
    const status = this.projectStatus();
    return status === 'En cours' || status === 'À venir';
  });

  statusBadgeClasses = computed(() => {
    const statut = this.projectStatus();
    switch (statut) {
      case 'En cours':
        return 'bg-primary-50 border-primary-200 text-primary-700';
      case 'À venir':
        return 'bg-primary-100/60 border-primary-200 text-primary-700';
      case 'Terminé':
        return 'bg-gray-100 border-gray-200 text-gray-600';
      default:
        return 'bg-gray-100 border-gray-200 text-gray-700';
    }
  });

  private toggleSection(name: string) {
    this.activeSection.set(this.activeSection() === name ? null : name);
  }

  toggleDescription() {
    this.toggleSection('description');
  }

  toggleCriteria() {
    this.toggleSection('criteria');
  }

  toggleObjectives() {
    this.toggleSection('objectives');
  }

  toggleContext() {
    this.toggleSection('context');
  }

  orderedPhases = computed(() => {
    const phases = this.store.project()?.phases ?? [];
    return [...phases].sort((a, b) => ((a as { order?: number }).order ?? 0) - ((b as { order?: number }).order ?? 0));
  });

  icons = {
    fileText: FileText,
    calendarDays: CalendarDays,
    calendarCheck: CalendarCheck,
    tag: Tag,
    calendarSync: CalendarSync,
    share: Share2,
    chevronUp: ChevronUp,
    target: Target,
    info: Info,
    hourglass: Hourglass,
    checkCircle2: CheckCircle2,
    users: Users,
    squaresSubtract: SquaresSubtract,
    userPlus: UserPlus,
    alertCircle: AlertCircle,
    home: Home,
    arrowLeft: ArrowLeft,
    search: Search,
    layers: Layers,
    thumbsUp: ThumbsUp
  };

  responsiveOptions = carouselConfig;

  ngOnInit(): void {
    const slug = this.#route.snapshot.params['slug'];
    this.store.loadProject(slug);
  }

  addToCalendar() {
    const project = this.store.project();
    if (!project) return;
    const start = formatDateForGoogleCalendarUTC(project.started_at);
    const end = formatDateForGoogleCalendarUTC(project.ended_at);
    const title = encodeURIComponent(project.name || 'Project');
    const details = encodeURIComponent(project.description?.replace(/\n/g, ' ') || '');
    const url = `https://calendar.google.com/calendar/r/eventedit?text=${title}&details=${details}&dates=${start}/${end}`;
    openExternalUrl(url);
  }

  async shareProject() {
    const project = this.store.project();
    if (!project) return;
    interface LocalShareData {
      title?: string;
      text?: string;
      url?: string;
    }

    const shareData: LocalShareData = {
      title: project.name,
      text: (project.description || '').slice(0, 200),
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
      // ignore (user cancelled or not supported)
    }
  }

  applyToProject(): void {
    if (!this.authStore.user()) {
      this.showAuthModal.set(true);
      return;
    }
    const project = this.store.project();
    if (!project?.slug) return;
    this.#router.navigate(['/dashboard/programs', project.slug]);
  }

  closeAuthModal(): void {
    this.showAuthModal.set(false);
  }
}
