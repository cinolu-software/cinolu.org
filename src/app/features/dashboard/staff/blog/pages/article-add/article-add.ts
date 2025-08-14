import { CommonModule, Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  ArrowLeft,
  Check,
  ChevronsLeft,
  ChevronsRight,
  LucideAngularModule,
} from 'lucide-angular';
import { Button } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { InputText } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { StepperModule } from 'primeng/stepper';
import { TextareaModule } from 'primeng/textarea';
import { AddArticleStore } from '../../store/articles/add-article.store';
import { UnpaginatedTagStore } from '../../store/tags/unpaginated-tag.store';

@Component({
  selector: 'app-article-add',
  providers: [AddArticleStore, UnpaginatedTagStore],
  imports: [
    LucideAngularModule,
    SelectModule,
    MultiSelectModule,
    TextareaModule,
    StepperModule,
    CommonModule,
    Button,
    InputText,
    DatePickerModule,
    ReactiveFormsModule,
  ],
  templateUrl: './article-add.html',
  styles: ``,
})
export class ArticleAdd {
  #fb = inject(FormBuilder);
  #location = inject(Location);
  form: FormGroup;
  store = inject(AddArticleStore);
  tagsStore = inject(UnpaginatedTagStore);
  icons = {
    back: ArrowLeft,
    next: ChevronsRight,
    previous: ChevronsLeft,
    check: Check,
  };

  constructor() {
    this.form = this.#fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
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
