import { Component, inject, OnInit, ChangeDetectionStrategy, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import {
  LucideAngularModule,
  MapPin,
  Mail,
  Phone,
  Award,
  Users,
  TrendingUp,
  ChevronUp,
  Info,
  ChevronDown,
  ArrowLeft,
  Globe,
  Linkedin,
  Target,
  Package,
  ChevronLeft,
  ChevronRight,
  Building2
} from 'lucide-angular';
import { AmbassadorStore } from '../../store/ambassador.store';
import { getAmbassadorLevel, getInitials } from '../../../../shared/helpers/ambassador.helpers';
import { ApiImgPipe } from '../../../../shared/pipes/api-img.pipe';

@Component({
  selector: 'app-detail-ambassador',

  imports: [CommonModule, TranslateModule, ApiImgPipe, LucideAngularModule, RouterLink],
  providers: [AmbassadorStore],
  templateUrl: './detail-ambassador.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailAmbassador implements OnInit {
  private route = inject(ActivatedRoute);
  store = inject(AmbassadorStore);

  activeSection = signal<string | null>(null);
  galleryIndexes = signal<Map<string | number, number>>(new Map());

  expandedBiography = computed(() => this.activeSection() === 'biography');

  icons = {
    mapPin: MapPin,
    mail: Mail,
    phone: Phone,
    award: Award,
    users: Users,
    trendingUp: TrendingUp,
    chevronUp: ChevronUp,
    info: Info,
    chevronDown: ChevronDown,
    arrowLeft: ArrowLeft,
    globe: Globe,
    linkedin: Linkedin,
    target: Target,
    package: Package,
    chevronLeft: ChevronLeft,
    chevronRight: ChevronRight,
    building: Building2
  };

  ambassador = computed(() => this.store.ambassador());
  ambassadorBadge = computed(() => getAmbassadorLevel(this.ambassador()?.referralsCount));

  ngOnInit(): void {
    const email = this.route.snapshot.paramMap.get('email');
    if (email) {
      this.store.loadAmbassador(email);
    }
  }

  getInitials(name: string): string {
    return getInitials(name);
  }

  private toggleSection(name: string) {
    this.activeSection.set(this.activeSection() === name ? null : name);
  }

  toggleBiography() {
    this.toggleSection('biography');
  }

  getGalleryIndex(productId: string | number): number {
    return this.galleryIndexes().get(productId) ?? 0;
  }

  nextImage(productId: string | number, galleryLength: number): void {
    const currentIndex = this.getGalleryIndex(productId);
    const newIndex = (currentIndex + 1) % galleryLength;
    const newMap = new Map(this.galleryIndexes());
    newMap.set(productId, newIndex);
    this.galleryIndexes.set(newMap);
  }

  previousImage(productId: string | number, galleryLength: number): void {
    const currentIndex = this.getGalleryIndex(productId);
    const newIndex = (currentIndex - 1 + galleryLength) % galleryLength;
    const newMap = new Map(this.galleryIndexes());
    newMap.set(productId, newIndex);
    this.galleryIndexes.set(newMap);
  }

  goToImage(productId: string | number, index: number): void {
    const newMap = new Map(this.galleryIndexes());
    newMap.set(productId, index);
    this.galleryIndexes.set(newMap);
  }
}
