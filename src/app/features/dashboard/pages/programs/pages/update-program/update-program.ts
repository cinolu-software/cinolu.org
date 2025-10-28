import { ProgramStore } from './../../../../../landing/store/program.store';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { Textarea } from 'primeng/textarea';
import { UpdateProgramStore } from '../../store/programs/update-program.store';
import { AddIndicatorStore, IndicatorDto } from '../../store/programs/add-indicators.store';
import { UnpaginatedCategoriesStore } from '../../store/categories/unpaginated-categories.store';
import { Tabs } from '../../../../../../shared/components/tabs/tabs';
import { ChartColumn, SquarePen } from 'lucide-angular';
import { environment } from '../../../../../../../environments/environment';
import { DatePicker } from 'primeng/datepicker';
import { IProgram } from '../../../../../../shared/models/entities.models';
import { FileUpload } from '../../../../../../shared/components/file-upload/file-upload';

@Component({
  selector: 'app-update-program-page',
  providers: [ProgramStore, UpdateProgramStore, UnpaginatedCategoriesStore, AddIndicatorStore],
  imports: [
    CommonModule,
    DatePicker,
    Tabs,
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    Textarea,
    FormsModule,
    Select,
    FileUpload
  ],
  templateUrl: './update-program.html'
})
export class UpdateProgram {
  #route = inject(ActivatedRoute);
  #fb = inject(FormBuilder);
  updateProgramStore = inject(UpdateProgramStore);
  categoriesStore = inject(UnpaginatedCategoriesStore);
  programStore = inject(ProgramStore);
  url = environment.apiUrl + 'programs/logo/';
  activeTab = signal('edit');
  addIndicatorStore = inject(AddIndicatorStore);
  indicatorsTab = signal<IndicatorDto[]>([]);
  year = signal<Date>(new Date());
  currentYear = new Date().getFullYear();
  tabs = [
    { label: 'Modifier le projet', name: 'edit', icon: SquarePen },
    { label: 'Les indicateurs', name: 'indicators', icon: ChartColumn }
  ];
  updateForm: FormGroup = this.#fb.group({
    id: ['', Validators.required],
    name: ['', Validators.required],
    description: ['', Validators.required],
    category: ['', Validators.required]
  });
  selectedYear = computed(() => this.year().getFullYear());

  constructor() {
    const slug = this.#route.snapshot.paramMap.get('slug');
    if (!slug) return;
    this.programStore.loadProgram(slug);
    effect(() => {
      const program = this.programStore.program();
      if (!program) return;
      this.#initIndicatorsTab(program);
      this.#patchForm(program);
    });
  }

  #initIndicatorsTab(program: IProgram): void {
    this.indicatorsTab.set(
      program.indicators_grouped?.[this.selectedYear()!] || [{ name: '', target: null, year: this.selectedYear() }]
    );
  }

  #patchForm(program: IProgram): void {
    this.updateForm.patchValue({
      id: program.id || '',
      name: program.name || '',
      description: program.description || '',
      category: program.category?.id || ''
    });
  }

  addIndicator(): void {
    this.indicatorsTab.update((indicators) => [...indicators, { name: '', target: null, year: this.selectedYear() }]);
  }

  removeIndicator(index: number): void {
    this.indicatorsTab.update((indicators) => indicators.filter((_, i) => i !== index));
  }

  onSaveIndicators(): void {
    const program = this.programStore.program();
    if (!program) return;
    const indicators = this.indicatorsTab()
      .filter((ind) => ind.name.trim() !== '')
      .map((ind) => ({ ...ind, year: this.selectedYear() }));
    if (!indicators.length) return;
    this.addIndicatorStore.addIndicator({ id: program.id, indicators });
  }

  onTabChange(tab: string): void {
    this.activeTab.set(tab);
  }

  onSubmit(): void {
    const program = this.programStore.program();
    if (this.updateForm.invalid || !program) return;
    this.updateProgramStore.updateProgram({
      programId: program.id,
      payload: this.updateForm.value
    });
  }
}
