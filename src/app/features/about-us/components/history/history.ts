import { Component } from '@angular/core';
import { HISTORY_TIMELINE } from '../../data/history.data';
import { CommonModule } from '@angular/common';
import { Timeline } from 'primeng/timeline';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ArrowDown, CalendarClock, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-history',
  imports: [CommonModule, LucideAngularModule, Timeline, CardModule, ButtonModule],
  templateUrl: './history.html',
  styles: ``,
})
export class History {
  historyData = HISTORY_TIMELINE;
  icons = {
    upArrow: ArrowDown,
    calendar: CalendarClock,
  };
}
