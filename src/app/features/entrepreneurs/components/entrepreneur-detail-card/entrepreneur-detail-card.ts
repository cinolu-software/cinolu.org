import { Component, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  LucideAngularModule,
  MoveRight,
  Users,
  MapPin,
  Briefcase,
  User,
  Package,
  Linkedin,
  Globe,
  Mail,
  Phone
} from 'lucide-angular';
import { ButtonModule } from 'primeng/button';
import { HeroCard } from '../../../../layout/components/hero-card/hero-card';
import { map } from 'rxjs';
import { VentureStore } from '@features/entrepreneurs/store/venture.store';
import { IUser, IVenture } from '../../../../shared/models';
import { ApiImgPipe } from '../../../../shared/pipes';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-entrepreneur-detail-card',
  providers: [VentureStore],
  imports: [
    CommonModule,
    RouterModule,
    LucideAngularModule,
    ButtonModule,
    ApiImgPipe,
    HeroCard,
    NgOptimizedImage,
    TranslateModule
  ],
  templateUrl: './entrepreneur-detail-card.html'
})
export class EntrepreneurDetailCard {
  #route = inject(ActivatedRoute);
  ventureStore = inject(VentureStore);

  icons = {
    users: Users,
    moveRight: MoveRight,
    mapPin: MapPin,
    briefcase: Briefcase,
    user: User,
    package: Package,
    linkedin: Linkedin,
    globe: Globe,
    email: Mail,
    phone: Phone
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

  // Computed signals pour vérifier l'existence des liens
  hasLinkedin = computed<boolean>(() => {
    const v = this.venture();
    return !!v?.linkedin_url && v.linkedin_url.trim() !== '';
  });

  hasWebsite = computed<boolean>(() => {
    const v = this.venture();
    return !!v?.website && v.website.trim() !== '';
  });

  hasEmail = computed<boolean>(() => {
    const v = this.venture();
    return !!v?.email && v.email.trim() !== '';
  });

  hasPhone = computed<boolean>(() => {
    const v = this.venture();
    return !!v?.phone_number && v.phone_number.trim() !== '';
  });

  hasAnyContact = computed<boolean>(() => {
    return this.hasLinkedin() || this.hasWebsite() || this.hasEmail() || this.hasPhone();
  });

  constructor() {
    effect(() => {
      const slug = this.#slugParam();
      if (slug) {
        this.ventureStore.loadVenture(slug);
      }
    });
  }
}
