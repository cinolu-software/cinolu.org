import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IconComponent } from '@shared/ui';

@Component({
  selector: 'app-referral-cta-card',

  imports: [CommonModule, RouterModule, IconComponent],
  templateUrl: './referral-cta-card.html'
})
export class ReferralCtaCard {}
