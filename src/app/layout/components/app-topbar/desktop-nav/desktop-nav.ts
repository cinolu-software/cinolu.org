import { Component, inject, input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';

import {
  LucideAngularModule,
  LayoutGrid,
  LogOut,
  ChevronDown,
} from 'lucide-angular';
import { ILink } from '../../../data/links.data';
import { ProgramsStore } from '../../../../features/landing/store/programs.store';
import { AuthStore } from '../../../../core/auth/auth.store';
import { ApiImgPipe } from '../../../../shared/pipes/api-img.pipe';

@Component({
  selector: 'app-desktop-nav',
  templateUrl: './desktop-nav.html',
  providers: [ProgramsStore],
  imports: [
    CommonModule,
    LucideAngularModule,
    ApiImgPipe,
    NgOptimizedImage,
    RouterModule,
  ],
})
export class DesktopNav {
  authStore = inject(AuthStore);
  links = input.required<ILink[]>();
  programsStore = inject(ProgramsStore);
  icons = { chevronRight: ChevronDown, dashboard: LayoutGrid, logOut: LogOut };

  onSignOut(): void {
    this.authStore.signOut();
  }
}
