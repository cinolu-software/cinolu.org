import { Component, inject, ChangeDetectionStrategy, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule, Crown, Medal, Trophy, Users, Sparkles, ArrowRight, MoveRight } from 'lucide-angular';
import { AmbassadorsStore } from '../../../ambassadors/store/ambassadors.store';
import { getAmbassadorLevel, getInitials } from '../../../../shared/helpers/ambassador.helpers';
import { IUser } from '../../../../shared/models';
import { ApiImgPipe } from '../../../../shared/pipes/api-img.pipe';

@Component({
  selector: 'app-top-ambassadors',
  imports: [CommonModule, RouterLink, TranslateModule, ApiImgPipe, LucideAngularModule],
  providers: [AmbassadorsStore],
  templateUrl: './top-ambassadors.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopAmbassadors {
  private _store = inject(AmbassadorsStore);

  icons = {
    crown: Crown,
    medal: Medal,
    trophy: Trophy,
    users: Users,
    sparkles: Sparkles,
    arrowRight: ArrowRight,
    MoveRight: MoveRight
  };

  store = {
    isLoading: this._store.isLoading,
    ambassadors: computed(() =>
      this._store
        .ambassadors()[0]
        .sort((a, b) => (b.referralsCount ?? 0) - (a.referralsCount ?? 0))
        .slice(0, 3)
    )
  };

  constructor() {
    this._store.loadAmbassadors({ page: 1, limit: 3 });
  }

  getInitials(name: string): string {
    return getInitials(name);
  }

  getAmbassadorBadge(referralsCount?: number) {
    return getAmbassadorLevel(referralsCount);
  }

  trackByAmbassadorId(_index: number, ambassador: IUser): string {
    return ambassador.id;
  }
}
