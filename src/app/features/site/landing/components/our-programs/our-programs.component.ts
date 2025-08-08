import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { ProgramsStore } from '../../store/programs.store';

@Component({
  selector: 'app-our-programs',
  providers: [ProgramsStore],
  imports: [ButtonModule, RouterLink],
  templateUrl: './our-programs.component.html',
})
export class OurProgramsComponent {
  store = inject(ProgramsStore);
}
