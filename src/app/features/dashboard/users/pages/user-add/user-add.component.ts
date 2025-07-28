import { Component, inject } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LucideAngularModule, MoveLeft } from 'lucide-angular';
import { ButtonModule } from 'primeng/button';
import { CommonModule, Location } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { UnpaginatedRolesStore } from '../../../roles/store/unpaginated-roles.store';
import { AddUserStore } from '../../store/add-user.store';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  providers: [AddUserStore, UnpaginatedRolesStore],
  imports: [
    LucideAngularModule,
    CommonModule,
    ButtonModule,
    InputTextModule,
    ProgressSpinnerModule,
    AvatarModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    MultiSelectModule
  ]
})
export class AddUserComponent {
  #fb = inject(FormBuilder);
  #location = inject(Location);
  addUserForm: FormGroup;
  store = inject(AddUserStore);
  rolesStore = inject(UnpaginatedRolesStore);
  icons = { back: MoveLeft };

  constructor() {
    this.addUserForm = this.#fb.group({
      email: ['', [Validators.required]],
      name: ['', Validators.required],
      phone_number: ['', Validators.required],
      address: ['', Validators.required],
      roles: [[], Validators.required]
    });
  }

  onAddUser(): void {
    this.store.addUser(this.addUserForm.value);
  }

  onGoBack(): void {
    this.#location.back();
  }
}
