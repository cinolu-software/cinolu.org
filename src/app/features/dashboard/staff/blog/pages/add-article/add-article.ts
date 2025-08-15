import { CommonModule, Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import 'quill/dist/quill.snow.css';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  ArrowLeft,
  ChevronsLeft,
  ChevronsRight,
  LucideAngularModule,
} from 'lucide-angular';
import { Button } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { InputText } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { AddArticleStore } from '../../store/articles/add-article.store';
import { UnpaginatedTagStore } from '../../store/tags/unpaginated-tag.store';
import { QuillModule } from 'ngx-quill';

@Component({
  selector: 'app-article-add',
  providers: [AddArticleStore, UnpaginatedTagStore],
  imports: [
    LucideAngularModule,
    SelectModule,
    MultiSelectModule,
    TextareaModule,
    CommonModule,
    Button,
    InputText,
    DatePickerModule,
    ReactiveFormsModule,
    QuillModule,
  ],
  templateUrl: './add-article.html',
})
export class AddArticle {
  #fb = inject(FormBuilder);
  #location = inject(Location);
  form: FormGroup;
  store = inject(AddArticleStore);
  tagsStore = inject(UnpaginatedTagStore);
  icons = {
    back: ArrowLeft,
    next: ChevronsRight,
    previous: ChevronsLeft,
  };

  constructor() {
    this.form = this.#fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      summary: ['', Validators.required],
      tags: [[], Validators.required],
    });
  }

  onAddArticle(): void {
    if (!this.form.valid) return;
    console.log(this.form.value);
    this.store.addArticle(this.form.value);
  }

  onGoBack(): void {
    this.#location.back();
  }
}
