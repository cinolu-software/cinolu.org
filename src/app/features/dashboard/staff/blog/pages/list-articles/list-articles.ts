import { CommonModule } from '@angular/common';
import { Component, inject, signal, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FilterArticleDto } from '../../dto/filter-article.dto';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  Eye,
  EyeOff,
  LucideAngularModule,
  Plus,
  RefreshCcw,
  Search,
  SquarePen,
  Trash,
} from 'lucide-angular';
import { NgxPaginationModule } from 'ngx-pagination';
import { ConfirmationService } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
// import { ConfirmPopup } from 'primeng/confirmpopup';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ApiImgPipe } from '../../../../../../shared/pipes/api-img.pipe';
import { DeleteArticleStore } from '../../store/articles/delete-article.store';
import { ArticlesStore } from '../../store/articles/articles.store';
import { AddArticleStore } from '../../store/articles/add-article.store';

@Component({
  selector: 'app-article-list',
  providers: [
    ConfirmationService,
    ConfirmationService,
    ArticlesStore,
    AddArticleStore,
    DeleteArticleStore,
  ],
  imports: [
    LucideAngularModule,
    CommonModule,
    ButtonModule,
    InputTextModule,
    ProgressSpinnerModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    RouterLink,
    // ConfirmPopup,
    AvatarModule,
    ApiImgPipe,
  ],
  templateUrl: './list-articles.html',
})
export class ListArticles implements OnInit {
  #route = inject(ActivatedRoute);
  #router = inject(Router);
  #fb = inject(FormBuilder);
  #confirmationService = inject(ConfirmationService);
  searchForm: FormGroup;
  store = inject(ArticlesStore);
  deleteArticleStore = inject(DeleteArticleStore);
  addArticleStore = inject(AddArticleStore);
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
  queryParams = signal<FilterArticleDto>({
    page: this.#route.snapshot.queryParamMap.get('page'),
    q: this.#route.snapshot.queryParamMap.get('q'),
  });

  constructor() {
    this.searchForm = this.#fb.group({
      q: [this.queryParams().q || '', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles(): void {
    this.store.loadArticles(this.queryParams());
  }

  onPageChange(currentPage: number): void {
    this.queryParams().page = currentPage === 1 ? null : currentPage.toString();
    this.updateRouteAndArticles();
  }

  async updateRoute(): Promise<void> {
    const queryParams = this.queryParams();
    await this.#router.navigate(['/dashboard/blog/articles'], { queryParams });
  }

  async updateRouteAndArticles(): Promise<void> {
    await this.updateRoute();
    this.loadArticles();
  }

  async onResetSearch(): Promise<void> {
    this.searchForm.reset();
    this.queryParams.set({ page: null, q: null });
    await this.updateRouteAndArticles();
  }

  async onSearch(): Promise<void> {
    const searchValue = this.searchForm.value.q;
    this.queryParams.set({ page: null, q: searchValue });
    await this.updateRouteAndArticles();
  }

  onDeleteArticle(articleId: string, article: Event): void {
    this.#confirmationService.confirm({
      target: article.currentTarget as EventTarget,
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
        this.deleteArticleStore.deleteArticle(articleId);
      },
    });
  }
}
