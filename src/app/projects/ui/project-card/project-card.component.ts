import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { ApiImgPipe } from '../../../shared/pipes/api-img.pipe';
import { IProject } from '../../../shared/utils/types/models.type';

@Component({
  selector: 'app-project-card',
  imports: [NgIcon, CommonModule, NgOptimizedImage, RouterLink, ApiImgPipe],
  templateUrl: './project-card.component.html',
})
export class ProjectCardComponent {
  project = input.required<IProject>();

  isFinished(project: IProject): boolean {
    return new Date(project.ended_at) <= new Date();
  }
}
