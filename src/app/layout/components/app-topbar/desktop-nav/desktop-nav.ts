import { Component, input, ChangeDetectionStrategy, computed } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { TranslateModule } from '@ngx-translate/core';
import { ILink } from '../../../data/links.data';
import { AuthStore } from '@core/auth/auth.store';
import { ApiImgPipe, TranslateFieldPipe } from '@shared/pipes';
import { IProgram } from '@shared/models';
import { LanguageSwitcherComponent } from '../../language-switcher/language-switcher.component';
import { TOPBAR_ICONS } from '../topbar.config';

@Component({
  selector: 'app-desktop-nav',
  templateUrl: './desktop-nav.html',
  imports: [
    CommonModule,
    LucideAngularModule,
    ApiImgPipe,
    TranslateFieldPipe,
    NgOptimizedImage,
    RouterModule,
    LanguageSwitcherComponent,
    TranslateModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DesktopNav {
  // Inputs
  readonly links = input.required<ILink[]>();
  readonly programs = input.required<IProgram[]>();
  readonly onestopUrl = input.required<string>();
  readonly authStore = input.required<InstanceType<typeof AuthStore>>();

  // Configuration
  readonly icons = TOPBAR_ICONS;

  // Computed
  readonly user = computed(() => this.authStore().user());

  onSignOut(): void {
    this.authStore().signOut();
  }
}
