import { Component } from '@angular/core';
import { Info, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-hero-gallery',
  imports: [LucideAngularModule],
  templateUrl: './hero-gallery.html',
})
export class HeroGallery {
  icons = {
    info: Info,
  };
}
