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
  Star,
  StarOff,
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
import { EventsStore } from '../../store/events/events.store';
import { ConfirmationService } from 'primeng/api';
import { DeleteEventStore } from '../../store/events/delete-event.store';
import { ConfirmPopup } from 'primeng/confirmpopup';
import { AvatarModule } from 'primeng/avatar';
import { PublishEventStore } from '../../store/events/publish-event.store';
import { ApiImgPipe } from '../../../../../../shared/pipes/api-img.pipe';
import { HighlightEventStore } from '../../store/events/highlight-event.store';
import { FilterEventsDto } from '../../dto/categories/filter-events.dto';

@Component({
  selector: 'app-events-list',
  templateUrl: './list-events.html',
  providers: [
    EventsStore,
    PublishEventStore,
    DeleteEventStore,
    ConfirmationService,
    HighlightEventStore
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
export class ListEvents implements OnInit {
  #route = inject(ActivatedRoute);
  #router = inject(Router);
  #fb = inject(FormBuilder);
  #confirmationService = inject(ConfirmationService);
  searchForm: FormGroup;
  store = inject(EventsStore);
  deleteEventStore = inject(DeleteEventStore);
  publishEventStore = inject(PublishEventStore);
  highlightStore = inject(HighlightEventStore);
  skeletonArray = Array.from({ length: 100 }, (_, i) => i + 1);
  icons = {
    refresh: RefreshCcw,
    edit: SquarePen,
    trash: Trash,
    search: Search,
    plus: Plus,
    eye: Eye,
    eyeOff: EyeOff,
    star: Star,
    starOff: StarOff
  };
  queryParams = signal<FilterEventsDto>({
    page: this.#route.snapshot.queryParamMap.get('page'),
    q: this.#route.snapshot.queryParamMap.get('q'),
  });

  constructor() {
    this.searchForm = this.#fb.group({
      q: [this.queryParams().q || '', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadEvents();
  }

  get count(): number {
    return this.store.events()[1];
  }

  loadEvents(): void {
    this.store.loadEvents(this.queryParams());
  }

  onPageChange(currentPage: number): void {
    this.queryParams().page = currentPage === 1 ? null : currentPage.toString();
    this.updateRouteAndEvents();
  }

  async updateRoute(): Promise<void> {
    const queryParams = this.queryParams();
    await this.#router.navigate(['/dashboard/events'], { queryParams });
  }

  highlightEvent(eventId: string): void {
    this.highlightStore.highlight(eventId);
  }

  updateRouteAndEvents(): void {
    this.updateRoute().then();
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
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Confirmer',
        severity: 'danger',
      },
      accept: () => {
        this.deleteEventStore.deleteEvent(projectId);
      },
    });
  }
}
