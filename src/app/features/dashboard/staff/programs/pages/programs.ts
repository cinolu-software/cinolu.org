import { Component, signal, viewChild } from '@angular/core';
import { GitBranch, Layers, LucideAngularModule } from 'lucide-angular';
import { NgClass } from '@angular/common';
import { ListPrograms } from '../components/list-programs/list-programs';
import { ListSubprograms } from '../components/subprograms/list-subprograms';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.html',
  imports: [LucideAngularModule, NgClass, ListPrograms, ListSubprograms],
})
export class Programs {
  icons = { program: Layers, subprograms: GitBranch };
  activeTab = signal<string>('programs');
  programsList = viewChild<ListPrograms>(ListPrograms);
  subprogramsList = viewChild<ListSubprograms>(ListSubprograms);

  get subprogramsCount() {
    return this.subprogramsList()?.count || 0;
  }

  get programsCount() {
    return this.programsList()?.count || 0;
  }

  setActiveTab(activeTab: string): void {
    this.activeTab.set(activeTab);
  }
}
