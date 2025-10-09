import { Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { LucideAngularModule, MoveRight, Users } from 'lucide-angular';
import { SOCIAL_LINKS } from '../../../contact-us/data/contact.data';
import { IUser } from '../../../../shared/models/entities.models';
import { EntrepreneursStore } from '../../store/ventures/entrepreneurs.store';
import { ButtonModule } from 'primeng/button';
import { ApiImgPipe } from '../../../../shared/pipes/api-img.pipe';
import { HeroCard } from '../../../../layout/components/hero-card/hero-card';

@Component({
  selector: 'app-entrepreneur-detail-card',
  standalone: true,
  providers: [EntrepreneursStore],
  imports: [
    CommonModule,
    RouterModule,
    LucideAngularModule,
    ButtonModule,
    ApiImgPipe,
    HeroCard,
    NgOptimizedImage,
  ],
  templateUrl: './entrepreneur-detail-card.html',
})
export class EntrepreneurDetailCard {
  private route = inject(ActivatedRoute);
  private ventures = inject(EntrepreneursStore);

  entrepreneur = signal<IUser | null>(null);
  socialLinks = SOCIAL_LINKS;

  icons = {
    users: Users,
    moveRight: MoveRight,
  };

  constructor() {
    const emailParam = this.route.snapshot.paramMap.get('email');
    const email = emailParam
      ? decodeURIComponent(emailParam).toLowerCase()
      : '';
    this.ventures.loadEntrepreneurs();
    effect(() => {
      const list = this.ventures.entrepreneurs();

      if (!list || list.length === 0) {
        return;
      }

      const found = list.find((e) => e.email.toLowerCase() === email);

      if (found) {
        this.entrepreneur.set(found);
      }
    });
  }
}
