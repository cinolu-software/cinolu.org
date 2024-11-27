import { CommonModule } from '@angular/common';
import { Component, inject, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Animations } from 'app/shared/utils/animations';
import { AlertComponent } from 'app/shared/ui/alert/alert.component';
import { AuthCardComponent } from '../../ui/auth-card/auth-card.component';
import { Observable } from 'rxjs';
import { IAPIResponse } from 'app/shared/services/api/types/api-response.type';
import { AuthService } from '../../data-access/auth.service';

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
