import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { ProgramsStore } from '../../store/programs.store';
import { ApiImgPipe } from '../../../../shared/pipes/api-img.pipe';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-our-programs',
  providers: [ProgramsStore],
  imports: [ButtonModule, RouterLink, ApiImgPipe, CommonModule, NgOptimizedImage],
  templateUrl: './our-programs.html'
})
export class OurPrograms {
  store = inject(ProgramsStore);
}
