import { CommonModule } from '@angular/common';
import { Component, input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { IAPIResponse } from '../../../../shared/services/api/types/api-response.type';
import { IField, IApplication } from '../../../../shared/utils/types/models.type';

@Component({
  selector: 'app-project-application',
  providers: [],
  imports: [ReactiveFormsModule, CommonModule, InputTextModule, TextareaModule, ButtonModule, SelectModule],
  templateUrl: './application.component.html',
})
export class ProjectApplicationComponent implements OnInit {
  application$: Observable<IAPIResponse<IApplication>> | undefined;
  fields = input<IField[]>();
  call = input<string>();
  form: FormGroup = new FormGroup({});

  buildForm(): void {
    const group: Record<string, FormControl> = {};
    this.fields()?.forEach((field) => {
      if (!field) return;
      group[field.label] = new FormControl('', field.required ? { nonNullable: true } : {});
    });
    this.form = new FormGroup(group);
  }

  ngOnInit(): void {
    this.buildForm();
  }

  submitForm(): void {
    if (this.form.invalid) return;
    // this.application$ = this.#callsService.apply(this.call(), this.form.value);
  }
}
