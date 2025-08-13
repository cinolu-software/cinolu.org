import { Component } from '@angular/core';
import { DollarSign } from 'lucide-angular';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-hero-donation',
  imports: [LucideAngularModule],
  templateUrl: './hero-donation.html',
  styles: ``,
})
export class HeroDonation {
  icons = { donation: DollarSign };
}
