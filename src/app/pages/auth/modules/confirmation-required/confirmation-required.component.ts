import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { team } from 'app/pages/landing/utils/data/team';
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
  #authService = inject(AuthService);
  #email = inject(ActivatedRoute).snapshot.queryParams['email'];
  team = team;
  resendEmailVerification: MutationResult<void, Error, unknown>;

  constructor() {
    this.resendEmailVerification = this.#authService.resendEmailVerification();
  }

  onResendEmailVerification() {
    this.resendEmailVerification.mutate(this.#email);
  }
}
