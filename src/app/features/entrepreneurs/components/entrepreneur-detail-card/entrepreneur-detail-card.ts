import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { LucideAngularModule, MoveRight, Users } from 'lucide-angular';
import { SOCIAL_LINKS } from '../../../contact-us/data/contact.data';
import { IUser, IVenture } from '../../../../shared/models/entities.models';
import { EntrepreneursStore } from '../../store/entrepreneurs.store';
import { ButtonModule } from 'primeng/button';
import { ApiImgPipe } from '../../../../shared/pipes/api-img.pipe';
import { HeroCard } from '../../../../layout/components/hero-card/hero-card';
import { map } from 'rxjs';

@Component({
  selector: 'app-entrepreneur-detail-card',
  standalone: true,
  providers: [EntrepreneursStore],
  imports: [CommonModule, RouterModule, LucideAngularModule, ButtonModule, ApiImgPipe, HeroCard, NgOptimizedImage],
  templateUrl: './entrepreneur-detail-card.html'
})
export class EntrepreneurDetailCard {
  private route = inject(ActivatedRoute);
  readonly ventures = inject(EntrepreneursStore);

  readonly socialLinks = SOCIAL_LINKS;

  readonly icons = {
    users: Users,
    moveRight: MoveRight
  };

  private readonly emailParam = toSignal(
    this.route.paramMap.pipe(map((params) => decodeURIComponent(params.get('email') || '').toLowerCase())),
    { initialValue: '' }
  );

  readonly entrepreneur = computed<IUser | null>(() => {
    const email = this.emailParam();
    const list = this.ventures.entrepreneurs();

    if (!email || !list || list.length === 0) {
      return null;
    }

    return list.find((e) => e.email.toLowerCase() === email) || null;
  });

  readonly publishedVentures = computed<IVenture[]>(() => {
    const entrepreneur = this.entrepreneur();
    if (!entrepreneur?.ventures) return [];
    return entrepreneur.ventures.filter((venture) => venture.is_published);
  });

  readonly hasPublishedVentures = computed<boolean>(() => this.publishedVentures().length > 0);

  constructor() {
    this.ventures.loadEntrepreneurs();
  }
}
