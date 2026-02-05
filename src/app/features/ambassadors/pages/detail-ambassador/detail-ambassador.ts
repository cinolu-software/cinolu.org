import { Component, inject, OnInit, ChangeDetectionStrategy, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule, MapPin, Mail, Phone, Award, Users, TrendingUp, ChevronUp, Info } from 'lucide-angular';
import { AmbassadorStore } from '../../store/ambassador.store';
import { getAmbassadorLevel, getInitials } from '../../../../shared/helpers/ambassador.helpers';
import { ApiImgPipe } from '../../../../shared/pipes/api-img.pipe';

@Component({
  selector: 'app-detail-ambassador',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule, ApiImgPipe, LucideAngularModule],
  providers: [AmbassadorStore],
  templateUrl: './detail-ambassador.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailAmbassador implements OnInit {
  private route = inject(ActivatedRoute);
  store = inject(AmbassadorStore);

  activeSection = signal<string | null>(null);

  expandedBiography = computed(() => this.activeSection() === 'biography');

  icons = {
    mapPin: MapPin,
    mail: Mail,
    phone: Phone,
    award: Award,
    users: Users,
    trendingUp: TrendingUp,
    chevronUp: ChevronUp,
    info: Info
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
}
