import { Component, computed, effect, inject, signal } from '@angular/core';
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
  Phone,
  ChevronDown,
  ChevronUp
} from 'lucide-angular';
import { ButtonModule } from 'primeng/button';
import { map } from 'rxjs';
import { PublicVentureStore } from '@features/entrepreneurs/store/venture.store';
import { IUser, IVenture } from '../../../../shared/models';
import { ApiImgPipe } from '../../../../shared/pipes';
import { TranslateModule } from '@ngx-translate/core';
import { getInitials } from '@shared/helpers/user.helper';

@Component({
  selector: 'app-entrepreneur-detail-card',
  providers: [PublicVentureStore],
  imports: [
    CommonModule,
    RouterModule,
    LucideAngularModule,
    ButtonModule,
    ApiImgPipe,
    NgOptimizedImage,
    TranslateModule
  ],
  templateUrl: './entrepreneur-detail-card.html'
})
export class EntrepreneurDetailCard {
  #route = inject(ActivatedRoute);
  ventureStore = inject(PublicVentureStore);

  /** Toggle ouvert/fermé pour la section Parcours */
  parcoursExpanded = signal(true);

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
    phone: Phone,
    chevronDown: ChevronDown,
    chevronUp: ChevronUp
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

  getInitials = getInitials;

  toggleParcours(): void {
    this.parcoursExpanded.update((v) => !v);
  }

  constructor() {
    effect(() => {
      const slug = this.#slugParam();
      if (slug) {
        this.ventureStore.loadVenture(slug);
      }
    });
  }
}
