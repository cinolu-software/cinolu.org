import { Component, Input } from '@angular/core';
import { IEntrepreneur } from '../../data/entrepreneurs.data';
import { NgOptimizedImage } from '@angular/common';
import { Button } from 'primeng/button';
import { ArrowRight, LucideAngularModule } from 'lucide-angular';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-compony-card',
  imports: [NgOptimizedImage, Button, LucideAngularModule, RouterLink],
  templateUrl: './compony-card.html',
  styles: ``,
})
export class ComponyCard {
  @Input() company!: IEntrepreneur;

  icons = {
    arrow: ArrowRight,
  };
}
