import { Component, inject, OnInit, computed, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthStore } from '@core/auth/auth.store';
import { VenturesStore } from '../../store/ventures.store';
import { ReferralsStore } from '@features/dashboard/store/referrals.store';
import { ProductsStore } from '../../store/products.store';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { HighlightsStore } from '@features/landing/store/highlights.store';
import { environment } from '@environments/environment';
import { ApiImgPipe } from '../../../../shared/pipes/api-img.pipe';
@Component({
  selector: 'app-dashboard-overview',
  imports: [RouterModule, ApiImgPipe, BaseChartDirective],
  providers: [HighlightsStore],
  templateUrl: './overview.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardOverview implements OnInit {
  authStore = inject(AuthStore);
  venturesStore = inject(VenturesStore);
  referralsStore = inject(ReferralsStore);
  productsStore = inject(ProductsStore);
  highlightsStore = inject(HighlightsStore);
  onestopUrl = environment.onestopUrl;

  // Icônes Material Icons (noms de strings)
  businessIcon = 'business_center';
  usersIcon = 'groups';
  packageIcon = 'inventory_2';
  userPlusIcon = 'person_add';

  public doughnutChartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: ['Complété', 'Restant'],
    datasets: [
      {
        data: [0, 100],
        backgroundColor: ['#5d9c46', '#e5e7eb'],
        borderWidth: 0
      }
    ]
  };

  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '75%',
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: false
      }
    }
  };

  ngOnInit() {
    this.venturesStore.loadAllVentures();
    this.productsStore.loadAllProducts();
    this.highlightsStore.loadHighlights();
    this.updateProfileCompletion();
  }

  get productsCount() {
    return this.productsStore.products()?.length || 0;
  }

  // Computed pour obtenir le premier highlight mis en avant
  featuredHighlight = computed(() => {
    const highlights = this.highlightsStore.highlights();
    return highlights.find((item) => 'is_highlighted' in item && item.is_highlighted) || highlights[0] || null;
  });

  // Computed signal pour le greeting
  greeting = computed(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bonjour';
    if (hour < 18) return 'Bon après-midi';
    return 'Bonsoir';
  });

  // Computed signal pour vérifier si l'utilisateur est admin
  isAdminUser = computed(() => {
    const user = this.authStore.user();
    const roles = user?.roles as unknown as string[];
    return roles.some((role) => role === 'admin' || role === 'staff');
  });

  // Computed signal pour le titre du highlight
  highlightTitle = computed(() => {
    const highlight = this.featuredHighlight();
    if (!highlight) return "Mise à l'échelle du réseau PNUD";
    return 'title' in highlight ? highlight.title : highlight.name;
  });

  // Computed signal pour la description du highlight
  highlightDescription = computed(() => {
    const highlight = this.featuredHighlight();
    if (!highlight) return 'Appel à solutions locales innovantes.';
    if ('summary' in highlight && highlight.summary) return this.truncateText(highlight.summary, 100);
    if ('description' in highlight && highlight.description) return this.truncateText(highlight.description, 100);
    return 'Découvrez cette nouveauté.';
  });

  // Computed signal pour le badge du highlight
  highlightBadge = computed(() => {
    const highlight = this.featuredHighlight();
    if (!highlight) return 'ACCELERATE 2025';
    switch (highlight.sourceKey) {
      case 'programs':
        return 'PROGRAMME';
      case 'subprograms':
        return 'SOUS-PROGRAMME';
      case 'events':
        return 'ÉVÉNEMENT';
      case 'projects':
        return 'PROJET';
      case 'articles':
        return 'ARTICLE';
      default:
        return 'À LA UNE';
    }
  });

  // Computed signal pour le lien du highlight
  highlightLink = computed(() => {
    const highlight = this.featuredHighlight();
    if (!highlight) return '#';
    switch (highlight.sourceKey) {
      case 'programs':
        return `/our-programs/${highlight.slug}`;
      case 'subprograms':
        return `/our-programs/subprograms/${highlight.slug}`;
      case 'events':
        return `/events/${highlight.slug}`;
      case 'projects':
        return `/programs/${highlight.slug}`;
      case 'articles':
        return `/blog-ressources/${highlight.slug}`;
      default:
        return '#';
    }
  });

  // Computed signal pour l'image du highlight
  highlightImage = computed(() => {
    const highlight = this.featuredHighlight();
    if (!highlight) return 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=1000';

    const apiUrl = environment.apiUrl;

    if (highlight.sourceKey === 'programs' && 'logo' in highlight && highlight.logo) {
      return `${apiUrl}uploads/programs/${highlight.logo}`;
    }
    if (highlight.sourceKey === 'subprograms' && 'logo' in highlight && highlight.logo) {
      return `${apiUrl}uploads/subprograms/${highlight.logo}`;
    }
    if (highlight.sourceKey === 'events' && 'cover' in highlight && highlight.cover) {
      return `${apiUrl}uploads/events/${highlight.cover}`;
    }
    if (highlight.sourceKey === 'projects' && 'cover' in highlight && highlight.cover) {
      return `${apiUrl}uploads/projects/${highlight.cover}`;
    }
    if (highlight.sourceKey === 'articles' && 'image' in highlight && highlight.image) {
      return `${apiUrl}uploads/articles/${highlight.image}`;
    }

    return 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=1000';
  });

  // Computed signal pour la complétion du profil
  profileCompletion = computed(() => this.calculateProfileCompletion());

  /** @deprecated Use highlightTitle computed signal instead */
  getHighlightTitle(): string {
    const highlight = this.featuredHighlight();
    if (!highlight) return "Mise à l'échelle du réseau PNUD";
    return 'title' in highlight ? highlight.title : highlight.name;
  }

  /** @deprecated Use highlightDescription computed signal instead */
  getHighlightDescription(): string {
    const highlight = this.featuredHighlight();
    if (!highlight) return 'Appel à solutions locales innovantes.';
    if ('summary' in highlight && highlight.summary) return this.truncateText(highlight.summary, 100);
    if ('description' in highlight && highlight.description) return this.truncateText(highlight.description, 100);
    return 'Découvrez cette nouveauté.';
  }

  /** @deprecated Use highlightBadge computed signal instead */
  getHighlightBadge(): string {
    const highlight = this.featuredHighlight();
    if (!highlight) return 'ACCELERATE 2025';
    switch (highlight.sourceKey) {
      case 'programs':
        return 'PROGRAMME';
      case 'subprograms':
        return 'SOUS-PROGRAMME';
      case 'events':
        return 'ÉVÉNEMENT';
      case 'projects':
        return 'PROJET';
      case 'articles':
        return 'ARTICLE';
      default:
        return 'À LA UNE';
    }
  }

  /** @deprecated Use highlightLink computed signal instead */
  getHighlightLink(): string {
    const highlight = this.featuredHighlight();
    if (!highlight) return '#';
    switch (highlight.sourceKey) {
      case 'programs':
        return `/our-programs/${highlight.slug}`;
      case 'subprograms':
        return `/our-programs/subprograms/${highlight.slug}`;
      case 'events':
        return `/events/${highlight.slug}`;
      case 'projects':
        return `/programs/${highlight.slug}`;
      case 'articles':
        return `/blog-ressources/${highlight.slug}`;
      default:
        return '#';
    }
  }

  /** @deprecated Use highlightImage computed signal instead */
  getHighlightImage(): string {
    const highlight = this.featuredHighlight();
    if (!highlight) return 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=1000';

    const apiUrl = environment.apiUrl;

    if (highlight.sourceKey === 'programs' && 'logo' in highlight && highlight.logo) {
      return `${apiUrl}uploads/programs/${highlight.logo}`;
    }
    if (highlight.sourceKey === 'subprograms' && 'logo' in highlight && highlight.logo) {
      return `${apiUrl}uploads/subprograms/${highlight.logo}`;
    }
    if (highlight.sourceKey === 'events' && 'cover' in highlight && highlight.cover) {
      return `${apiUrl}uploads/events/${highlight.cover}`;
    }
    if (highlight.sourceKey === 'projects' && 'cover' in highlight && highlight.cover) {
      return `${apiUrl}uploads/projects/${highlight.cover}`;
    }
    if (highlight.sourceKey === 'articles' && 'image' in highlight && highlight.image) {
      return `${apiUrl}uploads/articles/${highlight.image}`;
    }

    return 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=1000';
  }

  /** @deprecated Use isAdminUser computed signal instead */
  isAdmin(): boolean {
    const user = this.authStore.user();
    const roles = user?.roles as unknown as string[];
    return roles.some((role) => role === 'admin' || role === 'staff');
  }

  /** @deprecated Use greeting computed signal instead */
  getGreeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bonjour';
    if (hour < 18) return 'Bon après-midi';
    return 'Bonsoir';
  }

  private truncateText(text: string, maxLength: number): string {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  }

  /**
   * Calcule le pourcentage de complétion du profil utilisateur
   * en fonction des champs remplis
   */
  calculateProfileCompletion(): number {
    const user = this.authStore.user();
    if (!user) return 0;

    const fields = [
      user.name,
      user.email,
      user.phone_number,
      user.profile,
      user.city,
      user.country,
      user.biography,
      user.gender,
      user.birth_date
    ];

    const filledFields = fields.filter((field) => field && field.toString().trim() !== '').length;
    const totalFields = fields.length;

    return Math.round((filledFields / totalFields) * 100);
  }

  updateProfileCompletion() {
    const completion = this.calculateProfileCompletion();
    this.doughnutChartData.datasets[0].data = [completion, 100 - completion];
  }
}
