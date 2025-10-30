import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { LucideAngularModule, LucideIconData } from 'lucide-angular';

@Component({
  selector: 'app-tabs',
  imports: [LucideAngularModule, CommonModule],
  templateUrl: './tabs.html',
})
export class Tabs {
  tabs = input.required<{ label: string; name: string; icon: LucideIconData }[]>();
  activeTab = input<string>();
  tabChange = output<string>();

  onTabChange(tabName: string) {
    this.tabChange.emit(tabName);
  }
}
