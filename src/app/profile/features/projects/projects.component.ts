import { Component, input } from '@angular/core';
import { IVenture } from '../../../shared/utils/types/models.type';

@Component({
  selector: 'app-projects',
  imports: [],
  templateUrl: './projects.component.html'
})
export class ProjectsComponent {
  projects = input.required<IVenture[]>();
}
