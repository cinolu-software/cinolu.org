import { Directive, effect, inject, input, signal, TemplateRef, ViewContainerRef } from '@angular/core';
import { RightsService } from '../../core/auth/rights.service';
import { RoleEnum } from '../../core/auth/role.enum';
import { AuthStore } from '../../core/auth/auth.store';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective {
  hasRole = input.required<RoleEnum | undefined>({ alias: 'appHasRole' });
  #hasView = signal(false);
  #templateRef = inject(TemplateRef<HTMLDivElement>);
  #viewContainer = inject(ViewContainerRef);
  #rightsService = inject(RightsService);
  #authStore = inject(AuthStore);

  constructor() {
    effect(() => {
      const requiredRole = this.hasRole() ?? RoleEnum.Guest;
      const currentRoles = this.getUserRoles();
      const hasAccess = this.#rightsService.isAuthorized({ currentRoles, requiredRole });
      if (hasAccess && !this.#hasView()) {
        this.#viewContainer.createEmbeddedView(this.#templateRef);
        this.#hasView.set(true);
      } else if (!hasAccess && this.#hasView()) {
        this.#viewContainer.clear();
        this.#hasView.set(false);
      }
    });
  }

  private getUserRoles(): RoleEnum[] {
    return this.#authStore.user()?.roles as unknown as RoleEnum[];
  }
}
