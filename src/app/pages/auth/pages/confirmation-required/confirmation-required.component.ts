import { CommonModule } from '@angular/common';
import { Component, inject, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Animations } from '@core/animations';
import { AlertComponent } from '@core/components/alert';
import { AuthService } from '@core/auth/auth.service';
import { MutationResult } from '@ngneat/query';
import { AuthCardComponent } from '../../components/auth-card/auth-card.component';

@Component({
  selector: 'app-confirmation-required',
  templateUrl: './confirmation-required.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: Animations,
  standalone: true,
  imports: [RouterLink, CommonModule, AlertComponent, CommonModule, AuthCardComponent]
})
export class AuthConfirmationRequiredComponent {
  #authService = inject(AuthService);
  #email = inject(ActivatedRoute).snapshot.queryParams['email'];
  resendEmailVerification: MutationResult<void, Error, unknown>;

  constructor() {
    this.resendEmailVerification = this.#authService.resendEmailVerification();
  }

  onResendEmailVerification() {
    this.resendEmailVerification.mutate(this.#email);
  }
}
