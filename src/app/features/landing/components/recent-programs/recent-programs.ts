import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { ProgramsStore } from '../../store/programs.store';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ApiImgPipe } from '../../../../shared/pipes';
import { LucideAngularModule, MoveRight } from 'lucide-angular';

@Component({
  selector: 'app-recent-programs',
  providers: [ProgramsStore],
  imports: [ButtonModule, RouterLink, ApiImgPipe, CommonModule, NgOptimizedImage, LucideAngularModule],
  templateUrl: './recent-programs.html'
})
export class RecentPrograms {
  icons = {
    MoveRight: MoveRight
  };
  store = inject(ProgramsStore);
}
