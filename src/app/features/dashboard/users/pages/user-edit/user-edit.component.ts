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
import { UpdateUserStore } from '../../store/update-user.store';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  providers: [UserStore, UpdateUserStore, UnpaginatedRolesStore],
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
  updateStore = inject(UpdateUserStore);
  rolesStore = inject(UnpaginatedRolesStore);
  icons = { save: Save, back: MoveLeft, locate: Locate, alert: TriangleAlert, phone: Phone, email: Mail };

  constructor() {
    this.updateUserForm = this.#fb.group({
      id: ['', Validators.required],
      email: [{ value: '', disabled: true }, [Validators.required]],
      name: [{ value: '', disabled: true }, Validators.required],
      phone_number: [{ value: '', disabled: true }, Validators.required],
      address: [{ value: '', disabled: true }, Validators.required],
      roles: ['', Validators.required]
    });
    effect(() => {
      const user = this.store.user();
      if (!user) return;
      this.updateUserForm.patchValue({
        id: user.id,
        email: user.email,
        name: user.name,
        phone_number: user.phone_number,
        address: user.address,
        roles: user.roles.map((role) => role.id)
      });
    });
  }

  onUpdateUser(): void {
    this.updateStore.updateUser({
      ...this.updateUserForm.value,
      roles: this.updateUserForm.value?.roles?.map((id: string) => id)
    });
  }

  onGoBack(): void {
    this.#location.back();
  }
}
