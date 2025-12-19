import { Component, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { VenturesStore } from '../../../store/ventures.store';
import { ApiImgPipe } from '@shared/pipes/api-img.pipe';

@Component({
  selector: 'app-venture-details',
  standalone: true,
  imports: [CommonModule, RouterModule, ApiImgPipe, NgOptimizedImage],
  templateUrl: './venture-details.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VentureDetails implements OnInit {
  route = inject(ActivatedRoute);
  router = inject(Router);
  venturesStore = inject(VenturesStore);

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.venturesStore.loadVentureBySlug(slug);
    }
  }

  editVenture() {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.router.navigate(['/dashboard/ventures/edit', slug]);
    }
  }

  goBack() {
    this.router.navigate(['/dashboard/ventures']);
  }
}
