import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { ProgramsStore } from '../../store/programs.store';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ApiImgPipe } from '../../../../shared/pipes';
import { LucideAngularModule, MoveRight } from 'lucide-angular';
import { IProgram } from '../../../../shared/models';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-programs',
  providers: [ProgramsStore],
  imports: [ButtonModule, RouterLink, ApiImgPipe, CommonModule, NgOptimizedImage, LucideAngularModule, TranslateModule],
  templateUrl: './programs.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Programs {
  icons = {
    MoveRight: MoveRight
  };
  store = inject(ProgramsStore);

  constructor() {
    this.store.loadPrograms();
  }

  trackByProgramId(_index: number, program: IProgram): string {
    return program.id;
  }
}
