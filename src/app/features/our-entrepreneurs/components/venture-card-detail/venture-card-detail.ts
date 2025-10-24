import { Component, inject, OnInit } from '@angular/core';
import { Building2, Globe, Linkedin, LucideAngularModule, Mail, MoveRight, Phone } from 'lucide-angular';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ApiImgPipe } from '../../../../shared/pipes/api-img.pipe';
import { carouselConfig } from '../../../landing/config/carousel.config';
import { GalleriaModule } from 'primeng/galleria';
import { VentureDetailsStore } from '../../store/venture.store';
import { Button } from "primeng/button";
import { VentureCardSkeleton } from "../venture-card-skeleton/venture-card-skeleton";

@Component({
  selector: 'app-venture-card-detail',
  providers: [VentureDetailsStore],
  imports: [LucideAngularModule, CommonModule, ApiImgPipe, NgOptimizedImage, GalleriaModule, Button, RouterLink, VentureCardSkeleton],
  templateUrl: './venture-card-detail.html',
})
export class VentureCardDetail implements OnInit {
  route = inject(ActivatedRoute);
  store = inject(VentureDetailsStore);
  responsiveOptions = carouselConfig;

  icons = {
    moveRight: MoveRight,
    building: Building2,
    phone: Phone,
    linkedin: Linkedin,
    email: Mail,
    globe: Globe,
  };

  ngOnInit(): void {
    const slug = this.route.snapshot.params['slug'];
    this.store.loadVenture(slug);
  }
}
