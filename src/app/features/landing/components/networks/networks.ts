import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { LucideAngularModule, Network, Globe, Users } from 'lucide-angular';
import { TranslateModule } from '@ngx-translate/core';
import { NETWORKS } from '@features/landing/data/networks.data';

@Component({
  selector: 'app-networks',
  imports: [NgOptimizedImage, CommonModule, LucideAngularModule, TranslateModule],
  templateUrl: './networks.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Networks {
  networks = NETWORKS;

  icons = {
    network: Network,
    globe: Globe,
    users: Users
  };
}
