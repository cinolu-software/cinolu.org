import { Component, HostListener, inject, OnInit, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IUser } from '@core/types/models.type';
import { ILink } from './types/link.type';
import { environment } from 'environments/environment';
import { ImgPipe } from '@core/pipes/img.pipe';
import { ObservableQueryResult } from '@ngneat/query';
import { AuthService } from 'app/pages/auth/auth.service';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, RouterModule, NgOptimizedImage, FormsModule, ImgPipe],
  templateUrl: './topbar.component.html'
})
export class TopbarComponent implements OnInit {
  isOpen = signal(false);
  accountUrl = environment.accountUrl;
  result$: ObservableQueryResult<IUser | null>;
  #authService = inject(AuthService);

  ngOnInit(): void {
    this.result$ = this.#authService.getUser();
  }

  commonLinks: ILink[] = [
    {
      name: 'Programmes',
      path: '/programs'
    }
  ];

  authLinks: ILink[] = [
    {
      name: 'Se connecter',
      path: '/sign-in'
    },
    {
      name: "S'inscrire",
      path: '/sign-up'
    }
  ];

  unAuthenticatedUserLinks: ILink[] = [...this.commonLinks, ...this.authLinks];

  trimName(name: string): string {
    return name.length > 15 ? name.substring(0, 15) + '...' : name;
  }

  toogleMenu(): void {
    this.isOpen.update((value) => !value);
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const isNavbar = target.closest('.navbar');
    if (!isNavbar) this.isOpen.set(false);
  }
}
