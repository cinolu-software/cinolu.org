import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
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
import { VenturesService } from '../../data-access/ventures.service';
import { MatIconModule } from '@angular/material/icon';
import { Animations } from '../../../shared/utils/animations';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-projects',
  animations: Animations,
  providers: [provideNativeDateAdapter(), VenturesService],
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
  templateUrl: './update-venture.component.html'
})
export class UpdateVentureComponent implements OnInit, OnDestroy {
  sectors$: Observable<IAPIResponse<ISector[]>>;
  venture$: Observable<IAPIResponse<IVenture>>;
  image$: Observable<IAPIResponse<IVenture>>;
  stages = [StageEnum.Idea, StageEnum.startup, StageEnum.Growth, StageEnum.Mature];
  sectors = signal<string[]>([]);
  stage = signal<string>('');
  form: FormGroup;
  #fb = inject(FormBuilder);
  #venturesService = inject(VenturesService);
  #location = inject(Location);
  #route = inject(ActivatedRoute);
  #subscription: Subscription | null = null;
  #id: string;

  constructor() {
    this.#id = this.#route.snapshot.paramMap.get('id');
    this.form = this.#fb.group({
      name: ['', [Validators.required]],
      pitch: ['', [Validators.required]],
      founding_date: ['', [Validators.required]],
      address: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.sectors$ = this.#venturesService.getSectors();
    this.#subscription = this.#venturesService.getVenture(this.#id).subscribe(({ data: v }) => {
      this.stage.set(v?.stage);
      this.sectors.set(v?.sectors?.map((s) => s.id));
      this.form.patchValue({
        name: v?.name,
        pitch: v?.pitch,
        founding_date: v?.founding_date,
        address: v?.address
      });
    });
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
    this.venture$ = this.#venturesService.updateVenture(this.#id, payload);
  }

  onImageChange(event: Event): void {
    const fileInput: HTMLInputElement = event.target as HTMLInputElement;
    const file: File | undefined = fileInput.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('thumb', file);
      this.image$ = this.#venturesService.addImage(this.#id, formData);
    }
  }

  ngOnDestroy(): void {
    if (this.#subscription) this.#subscription.unsubscribe();
  }
}
