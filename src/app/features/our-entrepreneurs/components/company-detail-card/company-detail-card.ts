import { Component, inject, OnInit } from '@angular/core';
import { ENTREPRENEURS_DATA, IEntrepreneur } from '../../data/entrepreneurs.data';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { HeroCard } from '../../../../layout/components/hero-card/hero-card';
import { LucideAngularModule, MoveRight, Users } from 'lucide-angular';
import { SOCIAL_LINKS } from '../../../contact-us/data/contact.data';

@Component({
  selector: 'app-company-detail-card',
  imports: [CommonModule, HeroCard, LucideAngularModule, NgOptimizedImage],
  templateUrl: './company-detail-card.html',
})
export class CompanyDetailCard implements OnInit {
  entrepreneur?: IEntrepreneur;
  route = inject(ActivatedRoute);
  socialLinks = SOCIAL_LINKS;

  icons = {
    users: Users,
    moveRight: MoveRight,
  };

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.entrepreneur = ENTREPRENEURS_DATA.find((e) => e.id === id);
  }
}
