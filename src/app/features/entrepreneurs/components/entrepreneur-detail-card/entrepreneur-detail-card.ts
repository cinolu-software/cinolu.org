import { Component, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { LucideAngularModule, MoveRight, Users, MapPin, Briefcase, TrendingUp, User, Package } from 'lucide-angular';
import { SOCIAL_LINKS } from '../../../contact-us/data/contact.data';
import { ButtonModule } from 'primeng/button';
import { HeroCard } from '../../../../layout/components/hero-card/hero-card';
import { map } from 'rxjs';
import { VentureStore } from '@features/entrepreneurs/store/venture.store';
import { IUser, IVenture } from '@common/models';
import { ApiImgPipe } from '@common/pipes';

@Component({
  selector: 'app-entrepreneur-detail-card',
  standalone: true,
  providers: [VentureStore],
  imports: [CommonModule, RouterModule, LucideAngularModule, ButtonModule, ApiImgPipe, HeroCard, NgOptimizedImage],
  templateUrl: './entrepreneur-detail-card.html'
})
export class EntrepreneurDetailCard {
  #route = inject(ActivatedRoute);
  ventureStore = inject(VentureStore);
  socialLinks = SOCIAL_LINKS;
  icons = {
    users: Users,
    moveRight: MoveRight,
    mapPin: MapPin,
    briefcase: Briefcase,
    trendingUp: TrendingUp,
    user: User,
    package: Package
  };

  #slugParam = toSignal(
    this.#route.paramMap.pipe(
      map((params) => {
        const slug = params.get('slug') || '';
        return decodeURIComponent(slug).toLowerCase();
      })
    ),
    { initialValue: '' }
  );

  entrepreneur = computed<IUser | null>(() => {
    const venture = this.ventureStore.venture();
    return venture?.owner || null;
  });

  venture = computed<IVenture | null>(() => {
    return this.ventureStore.venture();
  });

  hasVenture = computed<boolean>(() => this.venture() !== null);

  constructor() {
    effect(() => {
      const slug = this.#slugParam();
      if (slug) {
        this.ventureStore.loadVenture(slug);
      }
    });
  }
}
