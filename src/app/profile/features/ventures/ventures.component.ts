import { Component, inject, OnInit } from '@angular/core';
import { IVenture } from '../../../shared/utils/types/models.type';
import { MatIconModule } from '@angular/material/icon';
import { VentureCardComponent } from '../../ui/ventures/ventures-card.component';
import { VenturesService } from '../../../ventures/data-access/ventures.service';
import { Observable } from 'rxjs';
import { IAPIResponse } from '../../../shared/services/api/types/api-response.type';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-ventures',
  providers: [VenturesService],
  imports: [MatIconModule, VentureCardComponent, CommonModule, RouterLink],
  templateUrl: './ventures.component.html'
})
export class UserVenturesComponent implements OnInit {
  ventures$: Observable<IAPIResponse<IVenture[]>>;
  #venturesService = inject(VenturesService);

  ngOnInit(): void {
    this.ventures$ = this.#venturesService.findByUser();
  }
}
