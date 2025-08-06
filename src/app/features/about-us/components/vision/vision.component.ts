import { Component } from '@angular/core';
import { LucideAngularModule, Telescope } from 'lucide-angular';

@Component({
  selector: 'app-vision',
  imports: [LucideAngularModule],
  templateUrl: './vision.component.html'
})
export class VisionComponent {
  icons = {
    vision: Telescope
  };
}
