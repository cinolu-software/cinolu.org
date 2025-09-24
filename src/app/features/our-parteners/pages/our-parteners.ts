import { Component } from '@angular/core';
import { PARTNERS } from '../../landing/data/partners.data';
import { CommonModule } from '@angular/common';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { Image } from 'primeng/image';
import { HeroCard } from "../../../layout/components/hero-card/hero-card";
import { Handshake, LucideAngularModule } from 'lucide-angular';


@Component({
  selector: 'app-our-parteners',
  imports: [
    CommonModule,
    AnimateOnScrollModule,
    Image,
    HeroCard,
    LucideAngularModule,
  ],
  templateUrl: './our-parteners.html',
})
export class OurParteners {
  parteners = PARTNERS;
  icons = {
    handshake: Handshake,
  };
}
