import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';
import { IProject } from 'app/shared/utils/types/models.type';
import { RouterLink } from '@angular/router';
import { ApiImgPipe } from 'app/shared/pipes/api-img.pipe';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-project-card',
  imports: [NgIcon, CommonModule, NgOptimizedImage, RouterLink, ApiImgPipe],
  templateUrl: './project-card.component.html'
})
export class ProjectCardComponent {
  project = input.required<IProject>();

  isFinished(project: IProject): boolean {
    return new Date(project.ended_at) <= new Date();
  }
}
