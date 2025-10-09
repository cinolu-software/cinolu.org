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
  selector: 'app-company-detail-card',
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
  templateUrl: './company-detail-card.html',
})
export class CompanyDetailCard {
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

    console.log('📩 Email reçu dans l’URL :', email);

    // On charge les entrepreneurs
    this.ventures.loadEntrepreneurs();

    // On écoute les changements du store
    effect(() => {
      const list = this.ventures.entrepreneurs();

      if (!list || list.length === 0) {
        console.log('⏳ En attente du chargement des entrepreneurs...');
        return;
      }

      console.log(
        '📊 Entrepreneurs chargés :',
        list.map((e) => e.email),
      );

      if (!email) {
        console.warn('⚠️ Aucun email trouvé dans l’URL.');
        return;
      }

      const found = list.find((e) => e.email.toLowerCase() === email);

      if (found) {
        this.entrepreneur.set(found);
        console.log('✅ Entrepreneur trouvé :', found);
      } else {
        console.warn('❌ Aucun entrepreneur trouvé pour :', email);
      }
    });
  }
}
