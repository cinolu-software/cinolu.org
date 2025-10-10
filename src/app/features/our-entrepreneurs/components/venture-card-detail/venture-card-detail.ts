import { Component, effect, inject, signal } from '@angular/core';
import { Building2, LucideAngularModule, MoveRight } from 'lucide-angular';
import { IVenture } from '../../../../shared/models/entities.models';
import { ActivatedRoute } from '@angular/router';
import { EntrepreneursStore } from '../../store/ventures/entrepreneurs.store';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ApiImgPipe } from '../../../../shared/pipes/api-img.pipe';

@Component({
  selector: 'app-venture-card-detail',
  providers: [EntrepreneursStore],
  imports: [LucideAngularModule, CommonModule, ApiImgPipe, NgOptimizedImage],
  templateUrl: './venture-card-detail.html',
})
export class VentureCardDetail {
  private route = inject(ActivatedRoute);
  private venturesStore = inject(EntrepreneursStore);

  venture = signal<IVenture | null>(null);

  icons = {
    moveRight: MoveRight,
    building: Building2,
  };

  constructor() {
    const slugParam = this.route.snapshot.paramMap.get('slug');
    const slug = slugParam ? decodeURIComponent(slugParam).toLowerCase() : '';

    this.venturesStore.loadEntrepreneurs();

    effect(() => {
      const list = this.venturesStore.entrepreneurs();

      if (!list || list.length === 0) {
        return;
      }

      for (const e of list) {
        const found = e.ventures?.find((v: IVenture) => v.slug.toLowerCase() === slug);
        if (found) {
          this.venture.set(found);
          break;
        }
      }
    });
  }
}
