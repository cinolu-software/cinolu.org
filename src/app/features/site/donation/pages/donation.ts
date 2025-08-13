import { Component } from '@angular/core';
import { HeroDonation } from '../components/hero/hero-donation';
import { MountDonation } from '../components/mount-donation/mount-donation';

@Component({
  selector: 'app-donation',
  imports: [HeroDonation, MountDonation],
  templateUrl: './donation.html',
})
export class Donation {}
