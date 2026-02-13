import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsStore } from '../../../../projects/store/projects.store';
import { ParticipationsStore } from '../../../store/participations.store';
import { ProgramCard } from '../../../components/program-card/program-card';
import { IProject } from '@shared/models';

@Component({
  selector: 'app-discover-programs',
  imports: [CommonModule, ProgramCard],
  providers: [ProjectsStore],
  templateUrl: './discover.html'
})
export class DiscoverPrograms implements OnInit {
  projectsStore = inject(ProjectsStore);
  participationsStore = inject(ParticipationsStore);

  ngOnInit(): void {
    this.projectsStore.loadProjects({ page: '1', categories: null });
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
