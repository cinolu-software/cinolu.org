import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProjectStore } from '../../../../projects/store/project.store';
import { VenturesStore } from '../../../store/ventures.store';
import { ParticipationsStore } from '../../../store/participations.store';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { GalleriaModule } from 'primeng/galleria';
import { ApiImgPipe } from '../../../../../shared/pipes/api-img.pipe';
import { carouselConfig } from '../../../../landing/config/carousel.config';
import { AuthStore } from '@core/auth/auth.store';
import { AlertTriangle, Info, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-program-detail',
  standalone: true,
  imports: [
    CommonModule,
    ConfirmDialogModule,
    DialogModule,
    ButtonModule,
    TagModule,
    GalleriaModule,
    ApiImgPipe,
    RouterLink,
    LucideAngularModule
  ],
  providers: [ProjectStore, ConfirmationService],
  templateUrl: './program-detail.html'
})
export class ProgramDetail implements OnInit {
  route = inject(ActivatedRoute);
  router = inject(Router);
  projectStore = inject(ProjectStore);
  venturesStore = inject(VenturesStore);
  participationsStore = inject(ParticipationsStore);
  authStore = inject(AuthStore);
  confirmationService = inject(ConfirmationService);

  showVentureSelectionModal = signal(false);
  responsiveOptions = carouselConfig;
  confirmIcon = signal<'alert' | 'info'>('alert');

  icons = {
    alertTriangle: AlertTriangle,
    info: Info
  };

  // Computed properties
  projectStatus = computed(() => {
    const project = this.projectStore.project();
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

  statusBadgeClasses = computed(() => {
    const status = this.projectStatus();
    switch (status) {
      case 'En cours':
        return 'bg-green-50 text-green-700 border-green-300';
      case 'À venir':
        return 'bg-blue-50 text-blue-700 border-blue-300';
      case 'Terminé':
        return 'bg-red-50 text-red-700 border-red-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  });

  ngOnInit(): void {
    const slug = this.route.snapshot.params['slug'];
    this.projectStore.loadProject(slug);
    this.venturesStore.loadAllVentures();
    this.participationsStore.myParticipations();
  }

  isProgramClosed(): boolean {
    const project = this.projectStore.project();
    if (!project || !project.ended_at) return false;
    return new Date(project.ended_at) < new Date();
  }

  hasApplied(): boolean {
    const project = this.projectStore.project();
    if (!project) return false;
    return this.participationsStore.participations().some((p) => p.project.id === project.id);
  }

  onApplyClick(): void {
    const project = this.projectStore.project();
    if (!project) return;

    const ventures = this.venturesStore.ventures();

    if (ventures.length === 0) {
      this.confirmIcon.set('alert');
      this.confirmationService.confirm({
        header: 'Aucune entreprise',
        message: 'Vous devez créer une entreprise avant de pouvoir postuler à un programme.',
        acceptLabel: 'Créer une entreprise',
        rejectLabel: 'Annuler',
        acceptButtonStyleClass: 'p-button-primary',
        accept: () => {
          this.router.navigate(['/dashboard/ventures/create']);
        }
      });
      return;
    }
    if (ventures.length === 1) {
      this.submitApplication(ventures[0].id);
      return;
    }

    this.showVentureSelectionModal.set(true);
  }

  submitApplication(ventureId: string): void {
    const project = this.projectStore.project();
    if (!project) return;

    const alreadyApplied = this.participationsStore.checkExistingParticipation(project.id, ventureId);

    if (alreadyApplied) {
      this.confirmIcon.set('info');
      this.confirmationService.confirm({
        header: 'Candidature existante',
        message: 'Vous avez déjà postulé à ce programme avec cette entreprise.',
        rejectVisible: false,
        acceptLabel: 'Compris'
      });
      return;
    }

    this.participationsStore.create({
      projectId: project.id,
      ventureId
    });
  }

  closeVentureModal(): void {
    this.showVentureSelectionModal.set(false);
  }
}
