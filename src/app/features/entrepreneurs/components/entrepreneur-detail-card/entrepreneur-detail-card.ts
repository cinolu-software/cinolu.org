import { Component, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { LucideAngularModule, MoveRight, Users } from 'lucide-angular';
import { SOCIAL_LINKS } from '../../../contact-us/data/contact.data';
import { IUser, IVenture } from '../../../../shared/models/entities.models';
import { ButtonModule } from 'primeng/button';
import { ApiImgPipe } from '../../../../shared/pipes/api-img.pipe';
import { HeroCard } from '../../../../layout/components/hero-card/hero-card';
import { map } from 'rxjs';
import { VentureStore } from '@features/entrepreneurs/store/venture.store';

@Component({
  selector: 'app-entrepreneur-detail-card',
  standalone: true,
  providers: [VentureStore],
  imports: [CommonModule, RouterModule, LucideAngularModule, ButtonModule, ApiImgPipe, HeroCard, NgOptimizedImage],
  templateUrl: './entrepreneur-detail-card.html'
})
export class EntrepreneurDetailCard {
  private route = inject(ActivatedRoute);
  readonly ventureStore = inject(VentureStore);

  readonly socialLinks = SOCIAL_LINKS;

  readonly icons = {
    users: Users,
    moveRight: MoveRight
  };

  private readonly slugParam = toSignal(
    this.route.paramMap.pipe(
      map((params) => {
        const slug = params.get('slug') || '';
        return decodeURIComponent(slug).toLowerCase();
      })
    ),
    { initialValue: '' }
  );

  readonly entrepreneur = computed<IUser | null>(() => {
    const venture = this.ventureStore.venture();
    return venture?.owner || null;
  });

  readonly venture = computed<IVenture | null>(() => {
    return this.ventureStore.venture();
  });

  readonly hasVenture = computed<boolean>(() => this.venture() !== null);

  constructor() {
    effect(() => {
      const slug = this.slugParam();
      if (slug) {
        this.ventureStore.loadVenture(slug);
      }
    });
  }
}
