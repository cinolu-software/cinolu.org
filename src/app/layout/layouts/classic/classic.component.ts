import { NgOptimizedImage } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { FuseFullscreenComponent } from '@fuse/components/fullscreen';
import { FuseLoadingBarComponent } from '@fuse/components/loading-bar';
import {
  FuseNavigationItem,
  FuseNavigationService,
  FuseVerticalNavigationComponent
} from '@fuse/components/navigation';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { SearchComponent } from 'app/layout/common/search/search.component';
import { UserComponent } from 'app/layout/common/user/user.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'classic-layout',
  templateUrl: './classic.component.html',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    FuseLoadingBarComponent,
    FuseVerticalNavigationComponent,
    MatButtonModule,
    MatIconModule,
    FuseFullscreenComponent,
    SearchComponent,
    UserComponent,
    RouterOutlet,
    NgOptimizedImage,
    RouterLink
  ]
})
export class ClassicLayoutComponent implements OnInit, OnDestroy {
  isScreenSmall: boolean;
  navigation: FuseNavigationItem[];
  private _unsubscribeAll = new Subject();
  private _fuseMediaWatcherService = inject(FuseMediaWatcherService);
  private _fuseNavigationService = inject(FuseNavigationService);

  constructor() {
    this.navigation = [
      {
        id: 'my-info',
        title: 'Mes informations',
        type: 'group'
      },
      {
        id: 'my-account',
        title: 'Mon compte',
        type: 'basic',
        icon: 'heroicons_outline:user-circle',
        link: '/dashboard/my-account'
      },
      {
        id: 'preferences',
        title: 'Préférences',
        type: 'basic',
        icon: 'heroicons_outline:cog',
        link: '/dashboard/my-preferences'
      },
      {
        id: 'my-enterprise',
        title: 'Mon entreprise',
        type: 'basic',
        icon: 'feather:activity',
        link: '/dashboard/my-enterprise'
      },
      {
        id: 'activity',
        title: 'Activités et nouvelles',
        type: 'group'
      },
      {
        id: 'calls',
        title: 'Les appels',
        type: 'basic',
        icon: 'feather:phone',
        link: '/dashboard/calls'
      },

      {
        id: 'coaching-mentorat',
        title: 'Coaching',
        type: 'collapsable',
        icon: 'heroicons_outline:academic-cap',
        children: [
          {
            id: 'coaching',
            title: 'Coaching',
            type: 'basic',
            link: '/dashboard/coaching'
          },
          {
            id: 'mentoring',
            title: 'Mentorat',
            type: 'basic',
            link: '/dashboard/mentoring'
          }
        ]
      },
      {
        id: 'programs-trainning',
        title: 'Programmes',
        type: 'collapsable',
        icon: 'heroicons_outline:book-open',
        link: '/dashboard/coaching-mentorat',
        children: [
          {
            id: 'programs',
            title: 'Mes Programmes',
            type: 'basic',
            link: '/dashboard/programs'
          },
          {
            id: 'available-trainnings',
            title: 'Formations Disponibles',
            type: 'basic',
            link: '/dashboard/available-trainnings'
          },
          {
            id: 'history-trainning',
            title: 'Historique de Formation',
            type: 'basic',
            link: '/dashboard/history-training'
          }
        ]
      },
      {
        id: 'projects-collaborations',
        title: 'Projets',
        type: 'collapsable',
        icon: 'heroicons_outline:folder-open',
        link: '/dashboard/coaching-mentorat',
        children: [
          {
            id: 'projects',
            title: 'Mes Projets',
            type: 'basic',
            link: '/dashboard/projects'
          },
          {
            id: 'submit-project',
            title: 'Soumettre un Projet',
            type: 'basic',
            link: '/dashboard/submit-project'
          },
          {
            id: 'collaborations',
            title: 'Collaborations',
            type: 'basic',
            link: '/dashboard/collaborations'
          }
        ]
      }
    ];
  }

  get currentYear(): number {
    return new Date().getFullYear();
  }

  ngOnInit(): void {
    this._fuseMediaWatcherService.onMediaChange$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(({ matchingAliases }) => {
        this.isScreenSmall = !matchingAliases.includes('md');
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  toggleNavigation(name: string): void {
    const navigation = this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>(name);
    if (navigation) {
      navigation.toggle();
    }
  }
}
