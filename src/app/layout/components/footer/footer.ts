import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { PARCOURIR_LINKS, MY_CINOLU_LINKS, SOCIAL_LINKS } from '../../data/links.data';
import { LucideAngularModule, ArrowUpRight, ChevronRight, Mail, Send } from 'lucide-angular';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, NgOptimizedImage, LucideAngularModule, TranslateModule, FormsModule],
  templateUrl: './footer.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Footer {
  links = [
    { titleKey: 'footer.sections.explore', urls: PARCOURIR_LINKS },
    { titleKey: 'footer.sections.my_cinolu', urls: MY_CINOLU_LINKS },
    { titleKey: 'footer.sections.socials', urls: SOCIAL_LINKS }
  ];
  icons = { arrowUpRight: ChevronRight, arrowRight: ArrowUpRight, mail: Mail, send: Send };

  email = signal('');
  isSubmitting = signal(false);
  subscriptionSuccess = signal(false);

  getYear(): number {
    return new Date().getFullYear();
  }

  async subscribeNewsletter() {
    if (!this.email() || this.isSubmitting()) return;

    this.isSubmitting.set(true);

    // Simulation d'un appel API
    setTimeout(() => {
      this.subscriptionSuccess.set(true);
      this.email.set('');
      this.isSubmitting.set(false);

      // Réinitialiser le message de succès après 5 secondes
      setTimeout(() => {
        this.subscriptionSuccess.set(false);
      }, 5000);
    }, 1500);
  }
}
