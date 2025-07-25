import { Component } from '@angular/core';
import { HeroDonationComponent } from '../hero/hero-donation.component';
import { MountDonationComponent } from '../mount-donation/mount-donation.component';

@Component({
  selector: 'app-donation',
  imports: [HeroDonationComponent, MountDonationComponent],
  templateUrl: './donation.component.html',
  styles: ``
})
export class DonationComponent {}
