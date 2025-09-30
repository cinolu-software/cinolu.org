import { Component } from '@angular/core';
import { MountDonation } from '../components/mount-donation/mount-donation';
import { HeroCard } from '../../../layout/components/hero-card/hero-card';
import { Heart, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-donation',
  imports: [MountDonation, HeroCard, LucideAngularModule],
  templateUrl: './donation.html',
})
export class Donation {
  icons = { heart: Heart };
}
