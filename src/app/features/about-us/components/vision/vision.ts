import { Component } from '@angular/core';
import { LucideAngularModule, Telescope } from 'lucide-angular';

@Component({
  selector: 'app-vision',
  imports: [LucideAngularModule],
  templateUrl: './vision.html'
})
export class Vision {
  icons = {
    vision: Telescope
  };
}
