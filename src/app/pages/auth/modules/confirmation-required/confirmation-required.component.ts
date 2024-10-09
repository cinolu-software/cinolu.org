import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { team } from 'app/pages/landing/data/team';
import { ConfirmationRequiredStore } from './confirmation-required.store';
import { FuseAlertComponent } from '@fuse/components/alert';
import { Observable } from 'rxjs';
import { IConfirmationRequiredStore } from './types/confirmation-required-store.type';

@Component({
  selector: 'app-confirmation-required',
  templateUrl: './confirmation-required.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
  standalone: true,
  imports: [RouterLink, CommonModule, NgOptimizedImage, FuseAlertComponent, CommonModule]
})
export class AuthConfirmationRequiredComponent {
  team = team;
  state$: Observable<IConfirmationRequiredStore>;
  private _store = inject(ConfirmationRequiredStore);
  private _email = inject(ActivatedRoute).snapshot.queryParams['email'];

  constructor() {
    this.state$ = this._store.state$;
  }

  resendEmailVerification() {
    this._store.resendEmailVerification(this._email);
  }
}
