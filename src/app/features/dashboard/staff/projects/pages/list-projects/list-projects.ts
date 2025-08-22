import { Component, inject, OnInit, signal } from '@angular/core';
import {
  LucideAngularModule,
  RefreshCcw,
  SquarePen,
  Trash,
  Search,
  Plus,
  Eye,
  EyeOff,
} from 'lucide-angular';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { NgxPaginationModule } from 'ngx-pagination';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProjectsStore } from '../../store/projects/projects.store';
import { FilterProjectsDto } from '../../dto/filter-projects.dto';
import { ConfirmationService } from 'primeng/api';
import { DeleteProjectStore } from '../../store/projects/delete-project.store';
import { ConfirmPopup } from 'primeng/confirmpopup';
import { AvatarModule } from 'primeng/avatar';
import { PublishProjectStore } from '../../store/projects/publish-project.store';
import { ApiImgPipe } from '../../../../../../shared/pipes/api-img.pipe';

@Component({
  selector: 'app-projects-list',
  templateUrl: './list-projects.html',
  providers: [
    ProjectsStore,
    PublishProjectStore,
    DeleteProjectStore,
    ConfirmationService,
  ],
  imports: [
    LucideAngularModule,
    CommonModule,
    ButtonModule,
    InputTextModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    RouterLink,
    ConfirmPopup,
    AvatarModule,
    ApiImgPipe,
  ],
})
export class ListProjects implements OnInit {
  #route = inject(ActivatedRoute);
  #router = inject(Router);
  #fb = inject(FormBuilder);
  #confirmationService = inject(ConfirmationService);
  searchForm: FormGroup;
  store = inject(ProjectsStore);
  deleteProjectStore = inject(DeleteProjectStore);
  publishProjectStore = inject(PublishProjectStore);
  skeletonArray = Array.from({ length: 100 }, (_, i) => i + 1);
  icons = {
    refresh: RefreshCcw,
    edit: SquarePen,
    trash: Trash,
    search: Search,
    plus: Plus,
    eye: Eye,
    eyeOff: EyeOff,
  };
  queryParams = signal<FilterProjectsDto>({
    page: this.#route.snapshot.queryParamMap.get('page'),
    q: this.#route.snapshot.queryParamMap.get('q'),
  });

  constructor() {
    this.searchForm = this.#fb.group({
      q: [this.queryParams().q || '', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadProjects();
  }

  get count(): number {
    return this.store.projects()[1]
  }

  loadProjects(): void {
    this.store.loadProjects(this.queryParams());
  }

  onPageChange(currentPage: number): void {
    this.queryParams().page = currentPage === 1 ? null : currentPage.toString();
    this.updateRouteAndProjects();
  }

  updateRoute(): void {
    const queryParams = this.queryParams();
    this.#router.navigate(['/dashboard/projects/list'], { queryParams });
  }

  updateRouteAndProjects(): void {
    this.updateRoute();
    this.loadProjects();
  }

  onResetSearch(): void {
    this.searchForm.reset();
    this.queryParams.set({ page: null, q: null });
    this.updateRouteAndProjects();
  }

  onSearch(): void {
    const searchValue = this.searchForm.value.q;
    this.queryParams.set({ page: null, q: searchValue });
    this.updateRouteAndProjects();
  }

  onPublishProject(projectId: string): void {
    this.publishProjectStore.publishProject(projectId);
  }

  onDeleteProject(projectId: string, event: Event): void {
    this.#confirmationService.confirm({
      target: event.currentTarget as EventTarget,
      message: 'Etes-vous sûr ?',
      rejectButtonProps: {
        label: 'Annuler',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Confirmer',
        severity: 'danger',
      },
      accept: () => {
        this.deleteProjectStore.deleteProject(projectId);
      },
    });
  }
}
