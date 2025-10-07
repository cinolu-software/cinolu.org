import { Component } from '@angular/core';
import { DONATION_ITEMS, OPTION_ITEMS } from '../../data/mount.data';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ArrowUpRight, CircleChevronRight, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-mount-donation',
  imports: [CommonModule, ButtonModule, LucideAngularModule],
  templateUrl: './mount-donation.html',
  styles: ``,
})
export class MountDonation {
  mountItems = DONATION_ITEMS;
  OptionItems = OPTION_ITEMS;

  icons = {
    arrowUpRight: ArrowUpRight,
    circleChevronRight: CircleChevronRight,
  };
}
