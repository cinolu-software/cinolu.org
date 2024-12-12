import { Component, input } from '@angular/core';
import { IVenture } from '../../../shared/utils/types/models.type';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-projects',
  imports: [MatIconModule, RouterLink],
  templateUrl: './projects.component.html'
})
export class ProjectsComponent {
  projects = input.required<IVenture[]>();
}
