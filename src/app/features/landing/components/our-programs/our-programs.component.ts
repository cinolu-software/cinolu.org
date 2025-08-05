import { Component } from '@angular/core';
import { PROGRAMS_ITEMS } from '../../../our-programs/data/programs.data';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-our-programs',
  imports: [ButtonModule, RouterLink],
  templateUrl: './our-programs.component.html',
  styles: ``
})
export class OurProgramsComponent {
  programsItems = PROGRAMS_ITEMS;

  slugPath(path: string): string {
    const slug = path
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-');

    return slug;
  }
}
