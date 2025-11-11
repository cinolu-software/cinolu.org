import { Component, signal } from '@angular/core';
import { HISTORY_TIMELINE } from '../../data/history.data';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ArrowDown, CalendarClock, ChevronDown, ChevronRight, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-history',
  imports: [CommonModule, LucideAngularModule, ButtonModule],
  templateUrl: './history.html'
})
export class History {
  historyData = HISTORY_TIMELINE;
  icons = {
    upArrow: ArrowDown,
    calendar: CalendarClock,
    chevronDown: ChevronDown,
    chevronRight: ChevronRight
  };

  expandedMenu = signal<number | null>(null);

  toggleExpand(id: number) {
    this.expandedMenu.update((current) => (current === id ? null : id));
  }
}
