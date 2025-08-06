import { Component, input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { LucideAngularModule, FileText, NotepadTextDashed } from 'lucide-angular';
import { IProject } from '../../../../../../shared/models/entities.models';

@Component({
  selector: 'app-project-overview',
  imports: [LucideAngularModule, DatePipe, CommonModule],
  templateUrl: './overview.component.html'
})
export class ProjectOverviewComponent {
  project = input.required<IProject>();
  icons = { fileText: FileText, notepadTextDashed: NotepadTextDashed };
}
