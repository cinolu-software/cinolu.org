import { Component, inject, input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  LucideAngularModule,
  ChevronRight,
  LayoutGrid,
  LogOut,
} from 'lucide-angular';
import { ILink } from '../../../data/links.data';
import { ApiImgPipe } from '../../../../shared/pipes/api-img.pipe';
import { AuthStore } from '../../../../core/auth/auth.store';
import { ProgramsStore } from '../../../../features/landing/store/programs.store';

@Component({
  selector: 'app-desktop-nav',
  templateUrl: './desktop-nav.html',
  providers: [ProgramsStore],
  imports: [
    CommonModule,
    NgOptimizedImage,
    LucideAngularModule,
    RouterModule,
    ApiImgPipe,
  ],
})
export class DesktopNav {
  links = input.required<ILink[]>();
  authStore = inject(AuthStore);
  programsStore = inject(ProgramsStore);
  icons = { chevronRight: ChevronRight, dashboard: LayoutGrid, logOut: LogOut };

  onSignOut(): void {
    this.authStore.signOut();
  }
}
