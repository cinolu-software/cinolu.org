import { Component } from '@angular/core';
import { LucideAngularModule, Rocket } from 'lucide-angular';

@Component({
  selector: 'app-mission',
  imports: [LucideAngularModule],
  templateUrl: './mission.component.html',
  styles: ``,
})
export class MissionComponent {
  icons = {
    mission: Rocket,
  };
}
