import { Injectable } from '@angular/core';
import { RolesEnum } from '../../shared/enums/roles.enum';

export interface IAuthorizedParams {
  currentRoles: RolesEnum[];
  requiredRole: RolesEnum;
}

export interface Ihierarchy {
  role: string;
  priority: number;
}

@Injectable({
  providedIn: 'root'
})
export class RightsService {
  #hierarchies: Ihierarchy[] = [];

  constructor() {
    this.buildRoles([RolesEnum.Guest, RolesEnum.User, RolesEnum.Coach, RolesEnum.Staff, RolesEnum.Admin]);
  }

  private buildRoles(roles: RolesEnum[]): void {
    this.#hierarchies = roles.map((role, i) => {
      const priority = ++i;
      return { role, priority };
    });
  }

  #getPriority(role: RolesEnum): number {
    const hierarchy = this.#hierarchies.find((h) => h.role === role);
    return hierarchy ? hierarchy.priority : -1;
  }

  isAuthorized({ currentRoles, requiredRole }: IAuthorizedParams): boolean {
    const requiredPriority = this.#getPriority(requiredRole);
    const currentPriorities = currentRoles?.map((role) => this.#getPriority(role)) ?? [1];
    const currentHighPriority = Math.max(...currentPriorities);
    return currentHighPriority >= requiredPriority;
  }
}
