import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { LucideAngularModule, Network, Globe, Users } from 'lucide-angular';
import { Carousel } from 'primeng/carousel';
import { TranslateModule } from '@ngx-translate/core';
import { NETWORKS } from '@features/landing/data/networks.data';

@Component({
  selector: 'app-networks',
  imports: [NgOptimizedImage, CommonModule, LucideAngularModule, Carousel, TranslateModule],
  templateUrl: './networks.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Networks {
  responsiveOptions: {
    breakpoint: string;
    numVisible: number;
    numScroll: number;
  }[] = [
    {
      breakpoint: '1280px',
      numVisible: 4,
      numScroll: 1
    },
    {
      breakpoint: '1199px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '767px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '575px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  networks = NETWORKS;

  icons = {
    network: Network,
    globe: Globe,
    users: Users
  };
}
