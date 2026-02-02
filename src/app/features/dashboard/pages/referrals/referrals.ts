import { Component, inject, OnInit, signal, ChangeDetectionStrategy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ReferralsStore } from '../../store/referrals.store';
import { AuthStore } from '../../../../core/auth/auth.store';
import { ToastrService } from '../../../../core/services/toast/toastr.service';
import { ReferralActivityTimelineComponent } from '@features/dashboard/components/referral-activity-timeline/referral-activity-timeline';
import { ReferralBadgeCardComponent } from '@features/dashboard/components/referral-badge-card/referral-badge-card';

@Component({
  selector: 'app-referrals',
  imports: [DatePipe, ReferralActivityTimelineComponent, ReferralBadgeCardComponent],
  templateUrl: './referrals.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReferralsPage implements OnInit {
  referralsStore = inject(ReferralsStore);
  authStore = inject(AuthStore);
  toast = inject(ToastrService);

  copied = signal(false);

  ngOnInit() {
    const user = this.authStore.user();
    if (user?.referral_code) {
      this.referralsStore.setReferralCode(user.referral_code);
    }
    this.referralsStore.loadReferredUsers({ page: 1 });
  }

  generateCode() {
    this.referralsStore.generateReferralCode();
  }

  copyReferralCode() {
    const code = this.referralsStore.referralCode();
    if (code) {
      navigator.clipboard.writeText(code).then(() => {
        this.copied.set(true);
        this.toast.showSuccess('Code copié !');
      });
    }
  }

  getReferralLink(): string {
    const code = this.referralsStore.referralCode();
    return code ? `${window.location.origin}/sign-up?ref=${code}` : '';
  }

  copyReferralLink() {
    const link = this.getReferralLink();
    if (link) {
      navigator.clipboard.writeText(link).then(() => {
        this.toast.showSuccess('Lien copié !');
      });
    }
  }

  onShareReferral() {
    this.copyReferralLink();
  }

  onCopyReferral(link: string) {
    if (link) {
      navigator.clipboard
        .writeText(link)
        .then(() => {
          this.toast.showSuccess('Lien de parrainage copié !');
        })
        .catch(() => {
          this.toast.showError('Erreur lors de la copie du lien');
        });
    }
  }
}
