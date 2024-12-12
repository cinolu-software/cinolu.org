import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { IAPIResponse } from '../../../shared/services/api/types/api-response.type';
import { ISector, IVenture } from '../../../shared/utils/types/models.type';
import { AlertComponent } from '../../../shared/ui/alert/alert.component';
import { CommonModule, Location } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatRadioChange, MatRadioModule } from '@angular/material/radio';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { StageEnum } from '../../utils/enums/stage.enum';
import { venturesService } from '../../data-access/ventures.service';
import { MatIconModule } from '@angular/material/icon';
import { Animations } from '../../../shared/utils/animations';

@Component({
  selector: 'app-projects',
  animations: Animations,
  providers: [provideNativeDateAdapter(), venturesService],
  imports: [
    ReactiveFormsModule,
    AlertComponent,
    CommonModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatDatepickerModule,
    MatRadioModule,
    MatSelectModule,
    MatIconModule
  ],
  templateUrl: './add-venture.component.html'
})
export class AddVentureComponent implements OnInit {
  sectors$: Observable<IAPIResponse<ISector[]>>;
  project$: Observable<IAPIResponse<IVenture>>;
  stages = [StageEnum.Idea, StageEnum.startup, StageEnum.Growth, StageEnum.Mature];
  sectors = signal<string[]>([]);
  stage = signal<string>('');
  form: FormGroup;
  #fb = inject(FormBuilder);
  #projectsServive = inject(venturesService);
  #location = inject(Location);

  constructor() {
    this.form = this.#fb.group({
      name: ['', [Validators.required]],
      pitch: ['', [Validators.required]],
      founding_date: ['', [Validators.required]],
      address: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.sectors$ = this.#projectsServive.getSectors();
  }

  back(): void {
    this.#location.back();
  }

  onSectorsChange(event: MatSelectChange): void {
    this.sectors.set(event.value);
  }

  onStageSelection(event: MatRadioChange): void {
    this.stage.set(event.value);
  }

  onSubmit(): void {
    const payload = { ...this.form.value, sectors: this.sectors(), stage: this.stage() };
    this.project$ = this.#projectsServive.createVenture(payload);
  }
}
