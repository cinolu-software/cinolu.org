import { Component } from '@angular/core';
import { LucideAngularModule, Rocket } from 'lucide-angular';

@Component({
  selector: 'app-mission',
  imports: [LucideAngularModule],
  templateUrl: './mission.html',
  styles: ``
})
export class Mission {
  icons = {
    mission: Rocket
  };
}
