import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ParticipationsStore } from '../../../store/participations.store';
import { ApiImgPipe } from '../../../../../shared/pipes/api-img.pipe';
import { IParticipation } from '../../../../../shared/models/entities.models';

@Component({
  selector: 'app-my-applications',
  standalone: true,
  imports: [CommonModule, RouterLink, ApiImgPipe],
  providers: [],
  templateUrl: './my-applications.html',
  styleUrls: []
})
export class MyApplications implements OnInit {
  participationsStore = inject(ParticipationsStore);

  ngOnInit(): void {
    this.participationsStore.myParticipations();
  }

  getApplicationStatus(participation: IParticipation): { label: string; classes: string; icon: string } {
    const now = new Date();
    const endDate = participation.project.ended_at ? new Date(participation.project.ended_at) : null;
    const isProgramEnded = endDate && endDate < now;

    if (!participation.phases || participation.phases.length === 0) {
      if (isProgramEnded) {
        return {
          label: 'Non sélectionné',
          classes: 'bg-gray-50 text-gray-600 border border-gray-200',
          icon: 'cancel'
        };
      }
      return {
        label: 'En attente',
        classes: 'bg-amber-50 text-amber-700 border border-amber-200',
        icon: 'schedule'
      };
    }

    // Récupérer la dernière phase (phase actuelle)
    const currentPhase = participation.phases[participation.phases.length - 1];
    const totalPhases = participation.project.phases?.length || 0;
    const isLastPhase = participation.phases.length === totalPhases;

    if (isLastPhase && totalPhases > 0) {
      return {
        label: currentPhase.name,
        classes: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
        icon: 'verified'
      };
    }

    return {
      label: currentPhase.name,
      classes: 'bg-blue-50 text-blue-700 border border-blue-200',
      icon: 'check_circle'
    };
  }

  hasMultiplePhases(participation: IParticipation): boolean {
    return !!participation.phases && participation.phases.length > 1;
  }

  getPhaseCount(participation: IParticipation): number {
    return participation.phases?.length || 0;
  }
}
