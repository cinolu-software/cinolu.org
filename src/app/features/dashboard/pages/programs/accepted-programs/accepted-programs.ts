import { Component, computed, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ParticipationsStore } from '../../../store/participations.store';
import { ButtonModule } from 'primeng/button';
import { ApiImgPipe } from '../../../../../shared/pipes/api-img.pipe';
import { IParticipation, IPhase } from '../../../../../shared/models/entities.models';

enum ParticipationStatus {
  VALIDATED = 'VALIDATED',
  IN_PROGRESS = 'IN_PROGRESS',
  ELIMINATED = 'ELIMINATED'
}

interface ParticipationAnalysis {
  status: ParticipationStatus;
  totalProjectPhases: number;
  completedPhases: number;
  remainingPhases: number;
  progressPercentage: number;
  currentPhase: IPhase | null;
  isComplete: boolean;
}

interface StatusConfig {
  label: string;
  icon: string;
  classes: string;
  badgeClasses: string;
  borderClasses: string;
}

@Component({
  selector: 'app-accepted-programs',
  standalone: true,
  imports: [CommonModule, RouterLink, ButtonModule, ApiImgPipe],
  providers: [],
  templateUrl: './accepted-programs.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AcceptedPrograms implements OnInit {
  participationsStore = inject(ParticipationsStore);

  validParticipations = computed(() => {
    return this.participationsStore.participations().filter((p) => this.isValidForAcceptedPrograms(p));
  });

  stats = computed(() => {
    const validParticipations = this.validParticipations();
    const analyses = validParticipations.map((p) => this.analyzeParticipation(p));

    return {
      total: validParticipations.length,
      validated: analyses.filter((a) => a.status === ParticipationStatus.VALIDATED).length,
      inProgress: analyses.filter((a) => a.status === ParticipationStatus.IN_PROGRESS).length,
      eliminated: analyses.filter((a) => a.status === ParticipationStatus.ELIMINATED).length,
      averageProgress:
        analyses.length > 0
          ? Math.round(analyses.reduce((sum, a) => sum + a.progressPercentage, 0) / analyses.length)
          : 0
    };
  });

  ngOnInit(): void {
    this.participationsStore.myParticipations();
  }

  private isValidForAcceptedPrograms(participation: IParticipation): boolean {
    const projectPhases = participation.project.phases ?? [];
    return projectPhases.length >= 1;
  }

  analyzeParticipation(participation: IParticipation): ParticipationAnalysis {
    const projectPhases = participation.project.phases ?? [];
    const completedPhases = participation.phases ?? [];

    const totalProjectPhases = projectPhases.length;
    const completedPhasesCount = completedPhases.length;
    const remainingPhases = Math.max(0, totalProjectPhases - completedPhasesCount);
    const progressPercentage =
      totalProjectPhases > 0 ? Math.round((completedPhasesCount / totalProjectPhases) * 100) : 0;

    const status = this.determineStatus(completedPhasesCount, totalProjectPhases);
    const currentPhase = completedPhases.length > 0 ? completedPhases[completedPhases.length - 1] : null;

    return {
      status,
      totalProjectPhases,
      completedPhases: completedPhasesCount,
      remainingPhases,
      progressPercentage,
      currentPhase,
      isComplete: completedPhasesCount === totalProjectPhases && totalProjectPhases > 0
    };
  }

  private determineStatus(completed: number, total: number): ParticipationStatus {
    if (completed === total && total > 0) {
      return ParticipationStatus.VALIDATED;
    }
    if (completed > 0 && completed < total) {
      return ParticipationStatus.IN_PROGRESS;
    }
    return ParticipationStatus.ELIMINATED;
  }

  getStatusConfig(status: ParticipationStatus): StatusConfig {
    const configs: Record<ParticipationStatus, StatusConfig> = {
      [ParticipationStatus.VALIDATED]: {
        label: 'Validé',
        icon: 'verified',
        classes: 'bg-primary-50 text-primary-700',
        badgeClasses: 'bg-primary-100 text-primary-800 border-primary-200',
        borderClasses: 'border-primary-300 hover:border-primary-400'
      },
      [ParticipationStatus.IN_PROGRESS]: {
        label: 'En traitement',
        icon: 'pending_actions',
        classes: 'bg-blue-50 text-blue-700',
        badgeClasses: 'bg-blue-100 text-blue-800 border-blue-200',
        borderClasses: 'border-blue-300 hover:border-blue-400'
      },
      [ParticipationStatus.ELIMINATED]: {
        label: 'Éliminé',
        icon: 'cancel',
        classes: 'bg-red-50 text-red-700',
        badgeClasses: 'bg-red-100 text-red-800 border-red-200',
        borderClasses: 'border-red-300 hover:border-red-400'
      }
    };

    return configs[status];
  }

  getAnalysis(participation: IParticipation): ParticipationAnalysis {
    return this.analyzeParticipation(participation);
  }

  getConfig(participation: IParticipation): StatusConfig {
    const analysis = this.analyzeParticipation(participation);
    return this.getStatusConfig(analysis.status);
  }

  formatProgress(percentage: number): string {
    return `${percentage}%`;
  }

  isRecentPhase(phase: IPhase | null): boolean {
    if (!phase) return false;
    const phaseDate = new Date(phase.ended_at);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - phaseDate.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  }
}
