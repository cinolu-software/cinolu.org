import { Component, inject, OnInit, signal } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LucideAngularModule, RefreshCcw, Edit, Trash, Search, Plus, Eye, EyeOff } from 'lucide-angular';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EventsStore } from '../../store/events/events.store';
import { FilterEventsDto } from '../../dto/filter-events.dto';
import { ConfirmationService } from 'primeng/api';
import { DeleteEventStore } from '../../store/events/delete-event.store';
import { ConfirmPopup } from 'primeng/confirmpopup';
import { AvatarModule } from 'primeng/avatar';
import { PublishEventStore } from '../../store/events/publish-event.store';
import { ApiImgPipe } from '../../../../../../shared/pipes/api-img.pipe';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  providers: [EventsStore, PublishEventStore, DeleteEventStore, ConfirmationService],
  imports: [
    LucideAngularModule,
    CommonModule,
    ButtonModule,
    InputTextModule,
    ProgressSpinnerModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    RouterLink,
    ConfirmPopup,
    AvatarModule,
    ApiImgPipe
  ]
})
export class EventsListComponent implements OnInit {
  #route = inject(ActivatedRoute);
  #router = inject(Router);
  #fb = inject(FormBuilder);
  #confirmationService = inject(ConfirmationService);
  searchForm: FormGroup;
  store = inject(EventsStore);
  deleteEventStore = inject(DeleteEventStore);
  publishEventStore = inject(PublishEventStore);
  skeletonArray = Array.from({ length: 100 }, (_, i) => i + 1);
  icons = { refresh: RefreshCcw, edit: Edit, trash: Trash, search: Search, plus: Plus, eye: Eye, eyeOff: EyeOff };
  queryParams = signal<FilterEventsDto>({
    page: this.#route.snapshot.queryParamMap.get('page'),
    q: this.#route.snapshot.queryParamMap.get('q')
  });

  constructor() {
    this.searchForm = this.#fb.group({
      q: [this.queryParams().q || '', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.store.loadEvents(this.queryParams());
  }

  onPageChange(currentPage: number): void {
    this.queryParams().page = currentPage === 1 ? null : currentPage.toString();
    this.updateRouteAndEvents();
  }

  updateRoute(): void {
    const queryParams = this.queryParams();
    this.#router.navigate(['/dashboard/events/list'], { queryParams });
  }

  updateRouteAndEvents(): void {
    this.updateRoute();
    this.loadEvents();
  }

  onResetSearch(): void {
    this.searchForm.reset();
    this.queryParams.set({ page: null, q: null });
    this.updateRouteAndEvents();
  }

  onSearch(): void {
    const searchValue = this.searchForm.value.q;
    this.queryParams.set({ page: null, q: searchValue });
    this.updateRouteAndEvents();
  }

  onPublishProject(projectId: string): void {
    this.publishEventStore.publishEvent(projectId);
  }

  onDeleteProject(projectId: string, event: Event): void {
    this.#confirmationService.confirm({
      target: event.currentTarget as EventTarget,
      message: 'Etes-vous sûr ?',
      rejectButtonProps: {
        label: 'Annuler',
        severity: 'secondary',
        outlined: true
      },
      acceptButtonProps: {
        label: 'Confirmer',
        severity: 'danger'
      },
      accept: () => {
        this.deleteEventStore.deleteEvent(projectId);
      }
    });
  }
}
