import { Component, inject, OnInit } from '@angular/core';
import {
  ENTREPRENEURS_DATA,
  IEntrepreneur,
} from '../../data/entrepreneurs.data';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { HeroCard } from '../../../../layout/components/hero-card/hero-card';
import { LucideAngularModule, Users } from 'lucide-angular';

@Component({
  selector: 'app-company-detail-card',
  imports: [CommonModule, HeroCard, LucideAngularModule, NgOptimizedImage],
  templateUrl: './company-detail-card.html',
})
export class CompanyDetailCard implements OnInit {
  entrepreneur?: IEntrepreneur;
  route = inject(ActivatedRoute);

  icons = {
    users: Users,
  };


  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.entrepreneur = ENTREPRENEURS_DATA.find((e) => e.id === id);
  }
}
