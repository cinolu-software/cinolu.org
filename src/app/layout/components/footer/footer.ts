import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { PARCOURIR_LINKS, MY_CINOLU_LINKS, SOCIAL_LINKS } from '../../data/links.data';
import { LucideAngularModule, ArrowUpRight, ChevronRight, Mail, Send } from 'lucide-angular';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { NewsletterService } from '@shared/directives/newsletter-service';
import { take, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, NgOptimizedImage, LucideAngularModule, TranslateModule, ReactiveFormsModule],
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
  fb = inject(FormBuilder);
  newsletterService = inject(NewsletterService);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  getYear(): number {
    return new Date().getFullYear();
  }

  subscribe() {
    if (this.form.invalid || this.isSubmitting()) return;

    this.isSubmitting.set(true);

    this.newsletterService
      .subscribe(this.form.value.email!)
      .pipe(
        take(1),
        finalize(() => this.isSubmitting.set(false))
      )
      .subscribe({
        next: () => {
          this.subscriptionSuccess.set(true);
          this.form.reset();
          this.email.set('');
          setTimeout(() => this.subscriptionSuccess.set(false), 5000);
        },
        error: (err) => {
          console.error('Newsletter subscription error', err);
        }
      });
  }

  // async subscribeNewsletter() {
  //   if (!this.form.valid || this.isSubmitting()) return;

  //   const email = (this.form.value.email || '').toString().trim();
  //   if (!email) return;

  //   this.isSubmitting.set(true);
  //   this.error = false;

  //   this.newsletterService
  //     .subscribe(email)
  //     .pipe(
  //       take(1),
  //       finalize(() => this.isSubmitting.set(false))
  //     )
  //     .subscribe({
  //       next: () => {
  //         this.subscriptionSuccess.set(true);
  //         this.email.set('');
  //         this.form.reset();
  //         setTimeout(() => this.subscriptionSuccess.set(false), 5000);
  //       },
  //       error: (err) => {
  //         this.error = true;
  //         console.error('Newsletter subscription error', err);
  //       }
  //     });
  // }
}
