import { Component, signal, viewChild } from '@angular/core';
import { Folders, Tags, LucideAngularModule } from 'lucide-angular';
import { NgClass } from '@angular/common';
import { ListProjects } from './list-projects/list-projects';
import { ProjectCategories } from './project-categories/project-categories';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.html',
  imports: [LucideAngularModule, NgClass, ListProjects, ProjectCategories],
})
export class Projects {
  icons = { projects: Folders, categories: Tags };
  activeTab = signal<string>('projects');
  projectsList = viewChild<ListProjects>(ListProjects);
  projectCategories = viewChild<ProjectCategories>(ProjectCategories);

  get projectsCount(): number {
    return this.projectsList()?.count || 0;
  }

  get categoriesCount(): number {
    return this.projectCategories()?.count || 0;
  }

  setActiveTab(activeTab: string): void {
    this.activeTab.set(activeTab);
  }
}
