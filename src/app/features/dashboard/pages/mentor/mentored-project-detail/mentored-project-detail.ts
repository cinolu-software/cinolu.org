import { Component, inject, OnInit, OnDestroy, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { CommonModule, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiImgPipe } from '@shared/pipes/api-img.pipe';
import { MentorshipStore } from '../../../store/mentorship.store';
import { IPhase } from '@shared/models/entities.models';
import { IconComponent } from '@shared/ui';

@Component({
  selector: 'app-mentored-project-detail',
  imports: [RouterLink, NgClass, FormsModule, ApiImgPipe, CommonModule, IconComponent],
  templateUrl: './mentored-project-detail.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MentoredProjectDetail implements OnInit, OnDestroy {
  mentorshipStore = inject(MentorshipStore);
  private route = inject(ActivatedRoute);

  projectId = signal<string>('');
  searchQuery = signal<string>('');
  selectedPhaseId = signal<string>('');

  getProgress(completedCount: number, totalPhases: number): number {
    if (!totalPhases) return 0;
    return Math.round((completedCount / totalPhases) * 100);
  }

  myPhases = computed<IPhase[]>(() => {
    const project = this.mentorshipStore.selectedProject();
    if (!project?.phases) return [];
    return project.phases;
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('projectId') ?? '';
    this.projectId.set(id);
    this.mentorshipStore.loadMentoredProject(id);
    this.mentorshipStore.loadParticipations({ projectId: id });
  }

  ngOnDestroy(): void {
    this.mentorshipStore.clearSelectedProject();
  }

  onSearch(q: string): void {
    this.searchQuery.set(q);
    this.applyFilters();
  }

  onPhaseFilter(phaseId: string): void {
    this.selectedPhaseId.set(phaseId);
    this.applyFilters();
  }

  private applyFilters(): void {
    const id = this.projectId();
    const q = this.searchQuery();
    const phaseId = this.selectedPhaseId();
    this.mentorshipStore.setFilter(id, q, phaseId);
    this.mentorshipStore.loadParticipations({
      projectId: id,
      filter: { page: 1, q: q || undefined, phaseId: phaseId || undefined }
    });
  }

  loadMore(): void {
    const nextPage = this.mentorshipStore.currentPage() + 1;
    this.mentorshipStore.loadParticipations({
      projectId: this.projectId(),
      filter: {
        page: nextPage,
        q: this.searchQuery() || undefined,
        phaseId: this.selectedPhaseId() || undefined
      }
    });
  }

  trackById(_: number, item: { id: string }): string {
    return item.id;
  }

  getPhaseStatus(phase: IPhase): 'active' | 'past' | 'future' {
    const now = new Date();
    const start = new Date(phase.started_at);
    const end = new Date(phase.ended_at);
    if (start <= now && end >= now) return 'active';
    if (end < now) return 'past';
    return 'future';
  }
}
