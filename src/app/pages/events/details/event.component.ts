import { CommonModule, Location, NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { IEvent } from 'app/common/types/models.type';
import { EventService } from './event.service';
import { ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ImgPipe } from 'app/common/pipes/img.pipe';
import { TopbarComponent } from '../../../common/components/topbar/topbar.component';
import { Observable } from 'rxjs';
import { IAPIResponse } from '@core/services/api/types/api-response.type';

@Component({
  selector: 'app-program',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, NgOptimizedImage, ImgPipe, TopbarComponent],
  templateUrl: './event.component.html'
})
export class EventComponent implements OnInit {
  event$: Observable<IAPIResponse<IEvent>>;
  #detailsProgramService = inject(EventService);
  #activatedRoute = inject(ActivatedRoute);
  #location = inject(Location);

  ngOnInit(): void {
    const id = this.#activatedRoute.snapshot.paramMap.get('id');
    this.event$ = this.#detailsProgramService.getEvent(id);
  }

  back(): void {
    this.#location.back();
  }
}
