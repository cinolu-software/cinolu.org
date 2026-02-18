import { Component, inject, ChangeDetectionStrategy, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule, Crown, Medal, Trophy, Users, Sparkles, ArrowRight, MoveRight } from 'lucide-angular';
import { AmbassadorsStore } from '../../../ambassadors/store/ambassadors.store';
import { getAmbassadorLevel, getInitials } from '../../../../shared/helpers/ambassador.helpers';
import { IUser } from '../../../../shared/models';
import { ApiImgPipe } from '../../../../shared/pipes/api-img.pipe';

export type AmbassadorDisplay =
  | { type: 'real'; data: IUser; id: string }
  | { type: 'placeholder'; id: string };

const DISPLAY_ORDER_INDICES = [1, 3, 0, 2, 4] as const;

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
    ambassadors: computed(() => this._store.ambassadors()[0])
  };

  sortedAmbassadors = computed(() =>
    [...this.store.ambassadors()].sort((a, b) => (b.referralsCount ?? 0) - (a.referralsCount ?? 0)).slice(0, 5)
  );

  topFiveAmbassadors = computed((): AmbassadorDisplay[] => {
    const list = this.sortedAmbassadors();
    return DISPLAY_ORDER_INDICES.map((sortedIndex, displayIndex) => {
      const user = list[sortedIndex];
      if (user) return { type: 'real', data: user, id: user.id };
      return { type: 'placeholder', id: `placeholder-${displayIndex}` };
    });
  });

  constructor() {
    this._store.loadAmbassadors({ page: 1, limit: 5 });
    console.log(this.topFiveAmbassadors());
  }

  getInitials(name: string): string {
    return getInitials(name);
  }

  getAmbassadorBadge(referralsCount?: number) {
    return getAmbassadorLevel(referralsCount);
  }

  trackByDisplayId(_index: number, item: AmbassadorDisplay): string {
    return item.id;
  }

  getSlotWrapperClasses(index: number): string {
    const base =
      'flex flex-col items-center w-full sm:w-auto sm:flex-1 max-w-[280px] md:max-w-[240px] lg:max-w-[280px] xl:max-w-[300px]';
    const firstBase =
      'flex flex-col items-center w-full sm:w-auto sm:flex-1 sm:max-w-[320px] md:max-w-[280px] lg:max-w-[340px] xl:max-w-[380px]';
    const sideTranslate = 'md:transform md:translate-y-8';
    const hover = 'hover:scale-105 transition-all duration-300 group';
    if (index === 0) return `${base} ${sideTranslate} ${hover}`;
    if (index === 1) return `${base} ${sideTranslate} ${hover}`;
    if (index === 2) return `${firstBase} ${hover}`;
    if (index === 3)
      return `${base} md:max-w-[260px] lg:max-w-[300px] xl:max-w-[320px] ${sideTranslate} ${hover}`;
    if (index === 4) return `${base} ${sideTranslate} ${hover}`;
    return base;
  }

  getSlotTheme(index: number): 'slate' | 'yellow' | 'orange' {
    if (index === 0 || index === 1) return 'slate';
    if (index === 2) return 'yellow';
    return 'orange';
  }

  isFirstSlot(index: number): boolean {
    return index === 2;
  }

  getAvatarImgClasses(index: number): string {
    const sizeFirst =
      'relative w-28 h-28 sm:w-32 sm:h-32 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:w-40 xl:h-40 rounded-full object-cover border-4 shadow-2xl';
    const sizeSide =
      'relative w-24 h-24 sm:w-28 sm:h-28 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 rounded-full object-cover border-4 shadow-xl';
    const theme = this.getSlotTheme(index);
    const border =
      theme === 'yellow'
        ? 'border-yellow-400'
        : theme === 'orange'
          ? 'border-orange-400'
          : 'border-slate-400';
    return this.isFirstSlot(index) ? `${sizeFirst} ${border}` : `${sizeSide} ${border}`;
  }

  getAvatarInitialsClasses(index: number): string {
    const theme = this.getSlotTheme(index);
    const sizeFirst =
      'relative w-28 h-28 sm:w-32 sm:h-32 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:w-40 xl:h-40 rounded-full flex items-center justify-center text-white font-bold text-3xl border-4 shadow-2xl';
    const sizeSide =
      'relative w-24 h-24 sm:w-28 sm:h-28 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 rounded-full flex items-center justify-center text-white font-bold text-2xl border-4 shadow-xl';
    const gradient =
      theme === 'yellow'
        ? 'bg-gradient-to-br from-yellow-300 to-yellow-600 border-yellow-400'
        : theme === 'orange'
          ? 'bg-gradient-to-br from-orange-300 to-orange-500 border-orange-400'
          : 'bg-gradient-to-br from-slate-300 to-slate-500 border-slate-400';
    return this.isFirstSlot(index) ? `${sizeFirst} ${gradient}` : `${sizeSide} ${gradient}`;
  }

  getMedalClasses(index: number): string {
    return this.getSlotTheme(index) === 'orange'
      ? 'absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white'
      : 'absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-br from-slate-400 to-slate-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white';
  }

  getCardClasses(index: number): string {
    return this.getSlotTheme(index) === 'orange'
      ? 'bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg p-4 sm:p-5 lg:p-6 w-full text-center shadow-lg border border-orange-300'
      : 'bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg p-4 sm:p-5 lg:p-6 w-full text-center shadow-lg border border-slate-300';
  }

  getBadgeClasses(index: number): string {
    return this.getSlotTheme(index) === 'orange'
      ? 'inline-flex items-center px-3 sm:px-4 py-1 sm:py-1.5 bg-orange-500 text-white rounded-full text-xs sm:text-sm font-semibold'
      : 'inline-flex items-center px-3 sm:px-4 py-1 sm:py-1.5 bg-slate-500 text-white rounded-full text-xs sm:text-sm font-semibold';
  }
}
