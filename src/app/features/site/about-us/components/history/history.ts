import { Component } from '@angular/core';
import { HISTORY_DATA } from '../../data/history.data';
import { CommonModule } from '@angular/common';
import { ArrowDown, CalendarClock, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-history',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './history.html',
  styles: ``,
})
export class History {
  historyData = HISTORY_DATA;
  icons = {
    upArrow: ArrowDown,
    calendar: CalendarClock,
  };
}
