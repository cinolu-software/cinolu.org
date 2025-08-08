import { Component } from '@angular/core';
import { HeroDonationComponent } from '../components/hero/hero-donation.component';
import { MountDonationComponent } from '../components/mount-donation/mount-donation.component';

@Component({
  selector: 'app-donation',
  imports: [HeroDonationComponent, MountDonationComponent],
  templateUrl: './donation.component.html',
  styles: ``,
})
export class DonationComponent {}
