import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { UpdateInfoStore } from '../../data-access/update-info';
import { UpdatePasswordStore } from '../../data-access/update-password.store';
import { LucideAngularModule, Plus } from 'lucide-angular';

@Component({
  selector: 'app-profile-enterprises',
  templateUrl: './enterprises.component.html',
  providers: [UpdateInfoStore, UpdatePasswordStore],
  imports: [ButtonModule, InputTextModule, CommonModule, ReactiveFormsModule, LucideAngularModule]
})
export class ProfileEnterprisesComponent {
  // #formBuilder = inject(FormBuilder);
  icons = { plus: Plus };

  constructor() {}
}
