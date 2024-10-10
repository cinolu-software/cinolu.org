import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { team } from 'app/pages/landing/data/team';
import { FuseAlertComponent } from '@fuse/components/alert';
import { AuthService } from '../../auth.service';
import { MutationResult } from '@ngneat/query';

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
  private _authService = inject(AuthService);
  private _email = inject(ActivatedRoute).snapshot.queryParams['email'];
  resendEmailVerification: MutationResult<void, Error, unknown>;

  constructor() {
    this.resendEmailVerification = this._authService.resendEmailVerification();
  }

  onResendEmailVerification() {
    this.resendEmailVerification.mutate(this._email);
  }
}
