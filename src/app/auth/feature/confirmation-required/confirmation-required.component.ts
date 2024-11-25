import { CommonModule } from '@angular/common';
import { Component, inject, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Animations } from '@core/animations';
import { AlertComponent } from '@core/components/alert/alert.component';
import { AuthService } from '@core/auth/auth.service';
import { AuthCardComponent } from '../../ui/auth-card/auth-card.component';
import { Observable } from 'rxjs';
import { IAPIResponse } from '@core/services/api/types/api-response.type';

@Component({
  selector: 'app-confirmation-required',
  templateUrl: './confirmation-required.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: Animations,
  imports: [RouterModule, CommonModule, AlertComponent, AuthCardComponent]
})
export class AuthConfirmationRequiredComponent {
  #authService = inject(AuthService);
  #email = inject(ActivatedRoute).snapshot.queryParams['email'];
  resendEmailVerification$: Observable<IAPIResponse<void>>;

  onResendEmailVerification() {
    this.resendEmailVerification$ = this.#authService.resendEmailVerification(this.#email);
  }
}
