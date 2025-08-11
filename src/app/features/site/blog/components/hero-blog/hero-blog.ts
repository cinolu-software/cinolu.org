import { Component } from '@angular/core';
import { Info, LucideAngularModule } from 'lucide-angular';


@Component({
  selector: 'app-hero-blog',
  imports: [LucideAngularModule],
  templateUrl: './hero-blog.html',
  styles: ``
})
export class HeroBlog {
icons = { info: Info }
}
