import { Component, inject, OnInit, signal, computed, ChangeDetectionStrategy, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParticipationsStore } from '../../../store/participations.store';
import { ProgramCard } from '../../../components/program-card/program-card';
import { IProject } from '@shared/models';
import { ProjectsStore } from '../../../../projects/store/projects.store';

type LoadingPhase = 'current' | 'upcoming' | 'done';

@Component({
  selector: 'app-discover-programs',
  imports: [CommonModule, ProgramCard],
  templateUrl: './discover.html',
  providers: [ProjectsStore],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DiscoverPrograms implements OnInit {
  private readonly projectsStore = inject(ProjectsStore);
  private readonly participationsStore = inject(ParticipationsStore);

  private readonly loadingPhase = signal<LoadingPhase>('current');
  private readonly currentList = signal<IProject[]>([]);
  private readonly upcomingList = signal<IProject[]>([]);

  readonly currentProjects = this.currentList.asReadonly();
  readonly upcomingProjects = this.upcomingList.asReadonly();

  readonly isCurrentLoading = computed(() => this.loadingPhase() === 'current');
  readonly isUpcomingLoading = computed(() => this.loadingPhase() === 'upcoming');
  readonly isFullyLoaded = computed(() => this.loadingPhase() === 'done');

  readonly hasNoProjectsAtAll = computed(
    () => this.isFullyLoaded() && this.currentList().length === 0 && this.upcomingList().length === 0
  );

  readonly currentHeaderContext = {
    icon: 'rocket_launch',
    label: 'Programmes en cours'
  } as const;

  readonly upcomingHeaderContext = {
    icon: 'schedule',
    label: 'Programmes à venir',
    accent: 'blue'
  } as const;

  readonly emptyCurrentContext = {
    title: 'Aucun programme en cours',
    message: "Il n'y a pas de programmes actifs pour le moment.",
    icon: 'event_busy'
  } as const;

  readonly emptyUpcomingContext = {
    title: 'Aucun programme à venir',
    message: "Il n'y a pas de programmes prévus pour l'instant. Revenez bientôt !",
    icon: 'upcoming'
  } as const;

  constructor() {
    effect(() => {
      const store = this.projectsStore;
      if (!store) return;

      const isLoading = store.isLoading();
      const phase = this.loadingPhase();

      if (isLoading) return;

      if (phase === 'current') {
        this.currentList.set(store.projects()[0] ?? []);
        this.loadingPhase.set('upcoming');
        store.loadProjects({
          page: '1',
          categories: null,
          status: 'future'
        });
      } else if (phase === 'upcoming') {
        this.upcomingList.set(store.projects()[0] ?? []);
        this.loadingPhase.set('done');
      }
    });
  }

  ngOnInit(): void {
    this.projectsStore.loadProjects({
      page: '1',
      categories: null,
      status: 'current'
    });
    this.participationsStore.myParticipations();
  }

  isProgramClosed(project: IProject): boolean {
    if (!project.ended_at) return false;
    return new Date(project.ended_at) < new Date();
  }

  hasApplied(projectId: string): boolean {
    return this.participationsStore.participations().some((p) => p.project.id === projectId);
  }
}
