import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ISector, IVenture } from 'app/shared/utils/types/models.type';
import { ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ApiImgPipe } from 'app/shared/pipes/api-img.pipe';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Observable } from 'rxjs';
import { IAPIResponse } from 'app/shared/services/api/types/api-response.type';
import { FooterComponent } from '../../../shared/ui/footer/footer.component';
import { venturesService } from '../../data-access/ventures.service';
import { VentureSkeletonComponent } from '../../ui/venture-skeleton/venture-skeleton.component';

@Component({
  selector: 'app-venture',
  providers: [venturesService],
  imports: [
    CommonModule,
    NgOptimizedImage,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    FormsModule,
    ApiImgPipe,
    FooterComponent,
    VentureSkeletonComponent
  ],
  templateUrl: './venture.component.html'
})
export class VentureComponent implements OnInit {
  venture$: Observable<IAPIResponse<IVenture>>;
  #venturesService = inject(venturesService);
  #route = inject(ActivatedRoute);

  ngOnInit(): void {
    const id = this.#route.snapshot.paramMap.get('id');
    this.venture$ = this.#venturesService.getVenture(id);
  }

  getSectors(sectors: ISector[]): string {
    return sectors.map((s) => s.name).join(', ');
  }
}
