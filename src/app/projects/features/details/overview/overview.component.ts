import { Component, input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { IProject } from '../../../../shared/utils/types/models.type';
import { LucideAngularModule, FileText, NotepadTextDashed } from 'lucide-angular';

@Component({
  selector: 'app-project-overview',
  imports: [LucideAngularModule, DatePipe, CommonModule],
  templateUrl: './overview.component.html',
})
export class ProjectOverviewComponent {
  project = input.required<IProject>();
  icons = {
    fileText: FileText,
    notepadTextDashed: NotepadTextDashed,
  };
}
