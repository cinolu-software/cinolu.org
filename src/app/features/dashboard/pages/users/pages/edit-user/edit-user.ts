import { Component, effect, inject } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LucideAngularModule, Save, MoveLeft, Locate, TriangleAlert, Phone, Mail } from 'lucide-angular';
import { ButtonModule } from 'primeng/button';
import { CommonModule, Location, NgOptimizedImage } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersStore } from '../../store/users/user.store';
import { MultiSelectModule } from 'primeng/multiselect';
import { UpdateUserStore } from '../../store/users/update-user.store';
import { UnpaginatedRolesStore } from '../../store/roles/unpaginated-roles.store';
import { DatePickerModule } from 'primeng/datepicker';
import { ApiImgPipe } from '../../../../../../common/pipes/api-img.pipe';
import { SelectModule } from 'primeng/select';
import { GENDERS } from '../../../../../../common/data/genders.data';

@Component({
  selector: 'app-user-edit',
  templateUrl: './edit-user.html',
  providers: [UsersStore, UpdateUserStore, UnpaginatedRolesStore],
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
    DatePickerModule,
    MultiSelectModule,
    SelectModule,
  ],
})
export class EditUser {
  #fb = inject(FormBuilder);
  #location = inject(Location);
  genders = GENDERS;
  updateUserForm: FormGroup;
  store = inject(UsersStore);
  updateStore = inject(UpdateUserStore);
  rolesStore = inject(UnpaginatedRolesStore);
  icons = { save: Save, back: MoveLeft, locate: Locate, alert: TriangleAlert, phone: Phone, email: Mail };

  constructor() {
    this.updateUserForm = this.#fb.group({
      id: ['', Validators.required],
      email: ['', [Validators.required]],
      name: ['', Validators.required],
      phone_number: ['', Validators.required],
      gender: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      birth_date: ['', Validators.required],
      roles: [[], Validators.required],
    });
    effect(() => {
      const user = this.store.user();
      if (!user) return;
      this.updateUserForm.patchValue({
        ...user,
        birth_date: user.birth_date ? new Date(user.birth_date) : '',
        roles: user.roles.map((role) => role.id),
      });
    });
  }

  onUpdateUser(): void {
    this.updateStore.updateUser(this.updateUserForm.value);
  }

  onGoBack(): void {
    this.#location.back();
  }
}
