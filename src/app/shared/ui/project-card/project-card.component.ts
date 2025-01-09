import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IProject } from 'app/shared/utils/types/models.type';
import { RouterLink } from '@angular/router';
import { ApiImgPipe } from 'app/shared/pipes/api-img.pipe';

@Component({
  selector: 'app-project-card',
  imports: [MatIconModule, MatTooltipModule, CommonModule, NgOptimizedImage, RouterLink, ApiImgPipe],
  templateUrl: './project-card.component.html'
})
export class ProjectCardComponent {
  program = input.required<IProject>();

  isFinished(program: IProject): boolean {
    return new Date(program.ended_at) <= new Date();
  }
}
