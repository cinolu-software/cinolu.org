import { Component, inject, input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, LayoutGrid, LogOut, ChevronDown } from 'lucide-angular';
import { TranslateModule } from '@ngx-translate/core';
import { ILink } from '../../../data/links.data';
import { AuthStore } from '@core/auth/auth.store';
import { ApiImgPipe, TranslateFieldPipe } from '@shared/pipes';
import { IProgram } from '@shared/models';
import { LanguageSwitcherComponent } from '../../language-switcher/language-switcher.component';

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
  ]
})
export class DesktopNav {
  authStore = inject(AuthStore);
  links = input.required<ILink[]>();
  programs = input.required<IProgram[]>();
  onestopUrl = input.required<string>();
  icons = { chevronRight: ChevronDown, dashboard: LayoutGrid, logOut: LogOut };

  onSignOut(): void {
    this.authStore.signOut();
  }
}
