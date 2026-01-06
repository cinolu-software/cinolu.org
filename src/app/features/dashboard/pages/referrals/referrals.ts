import { Component, inject, OnInit, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReferralsStore } from '../../store/referrals.store';
import { AuthStore } from '../../../../core/auth/auth.store';
import { ToastrService } from '../../../../core/services/toast/toastr.service';

@Component({
  selector: 'app-referrals',
  standalone: true,
  imports: [CommonModule],
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
    this.referralsStore.loadReferrals();
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
}
