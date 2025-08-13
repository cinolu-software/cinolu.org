import { Component, inject } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LucideAngularModule, MoveLeft } from 'lucide-angular';
import { ButtonModule } from 'primeng/button';
import { CommonModule, Location } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { NgxPaginationModule } from 'ngx-pagination';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { AddUserStore } from '../../store/users/add-user.store';
import { UnpaginatedRolesStore } from '../../store/roles/unpaginated-roles.store';
import { DatePicker } from 'primeng/datepicker';

@Component({
  selector: 'app-user-add',
  templateUrl: './add-user.html',
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
    DatePicker,
    MultiSelectModule,
  ],
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
      city: ['', Validators.required],
      country: ['', Validators.required],
      birth_date: ['', Validators.required],
      roles: [[], Validators.required],
    });
  }

  onAddUser(): void {
    this.store.addUser(this.addUserForm.value);
  }

  onGoBack(): void {
    this.#location.back();
  }
}
