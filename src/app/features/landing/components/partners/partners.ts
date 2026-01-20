import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PARTNERS, PARTNERS_CATEGORIES, IPartner } from '../../data/partners.data';
import { NgOptimizedImage } from '@angular/common';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { UserPlus, LucideAngularModule, Heart, ShoppingCart, MoveUpRight, MoveRight } from 'lucide-angular';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-partners',
  imports: [
    NgOptimizedImage,
    InputGroupModule,
    InputGroupAddonModule,
    LucideAngularModule,
    RouterLink,
    ButtonModule,
    TranslateModule
  ],
  templateUrl: './partners.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Partners {
  partners = PARTNERS;
  categoryParteners = PARTNERS_CATEGORIES;

  firstRow: IPartner[] = [];
  secondRow: IPartner[] = [];

  icons = {
    userPlus: UserPlus,
    piHeart: Heart,
    shoppingCart: ShoppingCart,
    moveUp: MoveUpRight,
    MoveRight: MoveRight
  };

  selectedUserId = 0;

  constructor() {
    this.splitPartnersIntoRows();
  }

  private splitPartnersIntoRows(): void {
    const mid = Math.ceil(this.partners.length / 2);
    this.firstRow = this.partners.slice(0, mid);
    this.secondRow = this.partners.slice(mid);
  }

  selectPartenerType(type: number) {
    this.selectedUserId = type;
  }
}
