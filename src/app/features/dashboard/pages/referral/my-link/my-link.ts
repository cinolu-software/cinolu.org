import { Component, inject, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ReferralsStore } from '@features/dashboard/store/referrals.store';
import { AuthStore } from '@core/auth/auth.store';
import { ToastrService } from '@core/services/toast/toastr.service';
import { environment } from '@environments/environment';
import { REFERRAL_CONFIG, QRCodeCache } from '@features/dashboard/config/referral.constants';

@Component({
  selector: 'app-my-referral-link',
  imports: [CommonModule, RouterModule],
  templateUrl: './my-link.html'
})
export class MyReferralLink implements OnInit {
  referralsStore = inject(ReferralsStore);
  authStore = inject(AuthStore);
  toast = inject(ToastrService);
  sanitizer = inject(DomSanitizer);

  qrCodeDataUrl = signal<string | null>(null);
  isGeneratingQR = signal(false);
  showAllBenefits = signal(false);

  referralLink = computed(() => {
    const code = this.referralsStore.referralCode() || this.authStore.user()?.referral_code;
    if (!code) return null;
    return `${environment.appUrl}sign-up?ref=${code}`;
  });

  ngOnInit() {
    const code = this.authStore.user()?.referral_code;
    if (code) {
      this.referralsStore.setReferralCode(code);
      this.loadQRCodeFromCache(code);
    }
  }

  private loadQRCodeFromCache(code: string) {
    try {
      const cacheKey = REFERRAL_CONFIG.QR_CODE_CACHE_KEY;
      const cached = localStorage.getItem(cacheKey);

      if (cached) {
        const cache: QRCodeCache = JSON.parse(cached);
        const now = Date.now();

        if (cache.referralCode === code && now - cache.timestamp < REFERRAL_CONFIG.QR_CODE_CACHE_TTL) {
          this.qrCodeDataUrl.set(cache.dataUrl);
          return;
        }
      }
    } catch (error) {
      console.error('Erreur lors du chargement du cache QR Code:', error);
    }

    this.generateQRCode();
  }

  onGenerateCode() {
    this.referralsStore.generateReferralCode();
    const unsubscribe = setInterval(() => {
      if (this.referralLink()) {
        this.generateQRCode();
        clearInterval(unsubscribe);
      }
    }, 100);
    setTimeout(() => clearInterval(unsubscribe), 5000);
  }

  async onCopyLink() {
    const link = this.referralLink();
    if (!link) {
      this.toast.showError('Aucun lien de parrainage disponible');
      return;
    }
    try {
      await navigator.clipboard.writeText(link);
      this.toast.showSuccess('Lien copié dans le presse-papier !');
    } catch {
      this.toast.showError('Erreur lors de la copie');
    }
  }

  shareOnWhatsApp() {
    const link = this.referralLink();
    if (!link) return;

    const message = REFERRAL_CONFIG.SOCIAL_MESSAGES.WHATSAPP.replace('{LINK}', link);
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encodedMessage}`, '_blank', 'noopener,noreferrer');
  }

  shareOnLinkedIn() {
    const link = this.referralLink();
    if (!link) return;
    const url = encodeURIComponent(link);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank', 'noopener,noreferrer');
  }

  shareOnFacebook() {
    const link = this.referralLink();
    if (!link) return;
    const url = encodeURIComponent(link);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'noopener,noreferrer');
  }

  shareOnTwitter() {
    const link = this.referralLink();
    if (!link) return;

    const text = encodeURIComponent(REFERRAL_CONFIG.SOCIAL_MESSAGES.TWITTER);
    const url = encodeURIComponent(link);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank', 'noopener,noreferrer');
  }

  private async generateQRCode() {
    const link = this.referralLink();
    const code = this.referralsStore.referralCode() || this.authStore.user()?.referral_code;
    if (!link || !code) return;

    this.isGeneratingQR.set(true);
    try {
      const size = REFERRAL_CONFIG.QR_CODE_SIZE;
      const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(link)}`;
      this.qrCodeDataUrl.set(qrApiUrl);

      const cache: QRCodeCache = {
        dataUrl: qrApiUrl,
        referralCode: code,
        timestamp: Date.now()
      };
      localStorage.setItem(REFERRAL_CONFIG.QR_CODE_CACHE_KEY, JSON.stringify(cache));
    } catch (error) {
      console.error('Erreur génération QR code:', error);
      this.toast.showError('Erreur lors de la génération du QR code');
    } finally {
      this.isGeneratingQR.set(false);
    }
  }

  async downloadQRCode() {
    const qrUrl = this.qrCodeDataUrl();
    if (!qrUrl) return;
    try {
      const response = await fetch(qrUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const code = this.referralsStore.referralCode() || this.authStore.user()?.referral_code || 'code';
      a.download = `cinolu-referral-qr-${code}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      this.toast.showSuccess('QR Code téléchargé !');
    } catch {
      this.toast.showError('Erreur lors du téléchargement');
    }
  }
}
