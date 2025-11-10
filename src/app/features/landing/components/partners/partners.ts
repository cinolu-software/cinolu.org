import { Component } from '@angular/core';
import { PARTNERS, PARTNERS_CATEGORIES } from '../../data/partners.data';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { UserPlus, LucideAngularModule, Heart, ShoppingCart, MoveUpRight, MoveRight } from 'lucide-angular';
import { RouterLink } from '@angular/router';
import {} from '@angular/core';
import { Carousel } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-partners',
  imports: [
    NgOptimizedImage,
    CommonModule,
    InputGroupModule,
    InputGroupAddonModule,
    LucideAngularModule,
    RouterLink,
    Carousel,
    ButtonModule
  ],
  templateUrl: './partners.html'
})
export class Partners {
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

  partners = PARTNERS;
  categoryParteners = PARTNERS_CATEGORIES;

  icons = {
    userPlus: UserPlus,
    piHeart: Heart,
    shoppingCart: ShoppingCart,
    moveUp: MoveUpRight,
    MoveRight: MoveRight
  };

  selectedUserId = 0;

  selectPartenerType(type: number) {
    this.selectedUserId = type;
  }
}
