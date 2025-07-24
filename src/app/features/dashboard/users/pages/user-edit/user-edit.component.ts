import { Component, effect, inject } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LucideAngularModule, Save, MoveLeft, Locate, TriangleAlert, Phone, Mail } from 'lucide-angular';
import { ButtonModule } from 'primeng/button';
import { CommonModule, Location, NgOptimizedImage } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserStore } from '../../store/user.store';
import { ApiImgPipe } from '../../../../../shared/pipes/api-img.pipe';
import { MultiSelectModule } from 'primeng/multiselect';
import { UnpaginatedRolesStore } from '../../../roles/store/unpaginated-roles.store';

@Component({
  selector: 'app-users-edit',
  templateUrl: './user-edit.component.html',
  providers: [UserStore, UnpaginatedRolesStore],
  imports: [
    LucideAngularModule,
    CommonModule,
    ButtonModule,
    InputTextModule,
    ProgressSpinnerModule,
    AvatarModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    NgOptimizedImage,
    ApiImgPipe,
    MultiSelectModule
  ]
})
export class UserEditComponent {
  #fb = inject(FormBuilder);
  #location = inject(Location);
  updateUserForm: FormGroup;
  store = inject(UserStore);
  rolesStore = inject(UnpaginatedRolesStore);
  icons = { save: Save, back: MoveLeft, locate: Locate, alert: TriangleAlert, phone: Phone, email: Mail };

  constructor() {
    this.updateUserForm = this.#fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      phone_number: ['', Validators.required],
      address: ['', Validators.required],
      roles: ['', Validators.required]
    });
    effect(() => {
      const user = this.store.user();
      if (!user) return;
      this.updateUserForm.patchValue({
        email: user.email,
        name: user.name,
        phone_number: user.phone_number,
        address: user.address,
        roles: user.roles.map((role) => role.id)
      });
    });
  }

  onUpdateUser(): void {
    if (this.updateUserForm.invalid) {
      this.updateUserForm.markAllAsTouched();
      return;
    }
  }

  onGoBack(): void {
    this.#location.back();
  }
}
