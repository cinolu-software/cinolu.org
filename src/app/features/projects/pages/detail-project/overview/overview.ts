import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, FileText, NotepadTextDashed } from 'lucide-angular';
import { IProject } from '../../../../../shared/models/entities.models';

@Component({
  selector: 'app-project-overview',
  imports: [LucideAngularModule, CommonModule],
  templateUrl: './overview.html',
})
export class ProjectOverviewComponent {
  project = input.required<IProject>();
  icons = { fileText: FileText, notepadTextDashed: NotepadTextDashed };
}
