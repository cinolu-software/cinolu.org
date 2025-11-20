import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit, ChangeDetectionStrategy, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProjectSkeleton } from '../../components/project-skeleton/project-skeleton';
import {
  LucideAngularModule,
  ArrowLeft,
  FileText,
  NotepadText,
  CalendarDays,
  MapPin,
  Tag,
  ArrowRight,
  FileLock2,
  CalendarSync,
  CalendarX,
  MapPinHouse,
  Share2,
  ChevronUp
} from 'lucide-angular';
import { ProjectStore } from '../../store/project.store';
import { ActivatedRoute } from '@angular/router';
import { ApiImgPipe } from '../../../../shared/pipes/api-img.pipe';
import { IProject } from '../../../../shared/models/entities.models';
import { GalleriaModule } from 'primeng/galleria';
import { carouselConfig } from '../../../landing/config/carousel.config';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-project-detail',
  providers: [ProjectStore],
  imports: [
    CommonModule,
    FormsModule,
    ApiImgPipe,
    ProjectSkeleton,
    LucideAngularModule,
    NgOptimizedImage,
    GalleriaModule,
    TranslateModule
  ],
  templateUrl: './detail-project.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailProject implements OnInit {
  #route = inject(ActivatedRoute);
  store = inject(ProjectStore);
  expandedDescription = signal(false);

  icons = {
    moveLeft: ArrowLeft,
    fileText: FileText,
    notepadText: NotepadText,
    calendarDays: CalendarDays,
    mapPin: MapPin,
    tag: Tag,
    arrow: ArrowRight,
    fileLock: FileLock2,
    calendarSync: CalendarSync,
    calendarX: CalendarX,
    map: MapPinHouse,
    calendarCheck: CalendarX,
    share: Share2,
    chevronUp: ChevronUp
  };

  toggleDescription() {
    this.expandedDescription.update((v) => !v);
  }

  responsiveOptions = carouselConfig;
  ngOnInit(): void {
    const slug = this.#route.snapshot.params['slug'];
    this.store.loadProject(slug);
  }

  getStatut(project: IProject): string {
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
  }

  getStatusBadgeClasses(project: IProject | null | undefined): string {
    if (!project) return 'bg-gray-100 border-gray-200 text-gray-700';
    const statut = this.getStatut(project);
    if (statut === 'En cours') return 'bg-green-50 border-green-100 text-green-700';
    if (statut === 'À venir') return 'bg-amber-50 border-amber-100 text-amber-700';
    return 'bg-gray-100 border-gray-200 text-gray-700';
  }

  openLink(url?: string): void {
    if (!url) return;
    if (typeof window === 'undefined') return;
    window.open(url, '_blank');
  }

  private formatDateForCalendar(d: string | Date) {
    const dt = new Date(d);
    const yyyy = dt.getUTCFullYear().toString().padStart(4, '0');
    const mm = (dt.getUTCMonth() + 1).toString().padStart(2, '0');
    const dd = dt.getUTCDate().toString().padStart(2, '0');
    const hh = dt.getUTCHours().toString().padStart(2, '0');
    const min = dt.getUTCMinutes().toString().padStart(2, '0');
    const ss = dt.getUTCSeconds().toString().padStart(2, '0');
    return `${yyyy}${mm}${dd}T${hh}${min}${ss}Z`;
  }

  addToCalendar() {
    const project = this.store.project();
    if (!project) return;
    const start = this.formatDateForCalendar(project.started_at);
    const end = this.formatDateForCalendar(project.ended_at);
    const title = encodeURIComponent(project.name || 'Project');
    const details = encodeURIComponent(project.description?.replace(/\n/g, ' ') || '');
    const location = encodeURIComponent(project.place || '');
    const url = `https://calendar.google.com/calendar/r/eventedit?text=${title}&details=${details}&location=${location}&dates=${start}/${end}`;
    if (typeof window === 'undefined') return;
    window.open(url, '_blank');
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
}
