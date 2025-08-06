import { Component } from '@angular/core';
import { DollarSign } from 'lucide-angular';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-hero-donation',
  imports: [LucideAngularModule],
  templateUrl: './hero-donation.component.html',
  styles: ``
})
export class HeroDonationComponent {
  icons = { donation: DollarSign };
}
