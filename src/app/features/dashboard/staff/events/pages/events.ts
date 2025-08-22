import { Component, signal, viewChild } from '@angular/core';
import { CalendarCheck, Tags, LucideAngularModule } from 'lucide-angular';
import { NgClass } from '@angular/common';
import { ListEvents } from './list-events/list-events';
import { EventCategories } from './event-categories/event-categories';

@Component({
  selector: 'app-events',
  templateUrl: './events.html',
  imports: [LucideAngularModule, NgClass, ListEvents, EventCategories],
})
export class Events {
  icons = { events: CalendarCheck, categories: Tags };
  activeTab = signal<string>('events');
  eventsList = viewChild<ListEvents>(ListEvents);
  eventCategories = viewChild<EventCategories>(EventCategories);

  get projectsCount(): number {
    return this.eventsList()?.count || 0;
  }

  get categoriesCount(): number {
    return this.eventCategories()?.count || 0
  }

  setActiveTab(activeTab: string): void {
    this.activeTab.set(activeTab);
  }
}
