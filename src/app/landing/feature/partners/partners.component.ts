import { Component, inject, OnInit } from '@angular/core';
import { PartnersService } from '../../data-access/partners.service';
import { Observable } from 'rxjs';
import { IAPIResponse } from '../../../shared/services/api/types/api-response.type';
import { IPartner } from '../../../shared/utils/types/models.type';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ApiImgPipe } from '../../../shared/pipes/api-img.pipe';

@Component({
  selector: 'app-partners',
  providers: [PartnersService],
  imports: [CommonModule, NgOptimizedImage, ApiImgPipe],
  templateUrl: './partners.component.html'
})
export class PartnersComponent implements OnInit {
  partners: Observable<IAPIResponse<Record<string, IPartner[]>>>;
  #partnersService = inject(PartnersService);

  ngOnInit(): void {
    this.partners = this.#partnersService.getPartners();
  }

  removeCinolu(partners: IPartner[]): IPartner[] {
    return partners.filter((p) => p.website_link !== 'https://cinolu.org/');
  }
}
