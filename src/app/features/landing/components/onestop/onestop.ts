import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BookOpen, Lightbulb, LucideAngularModule, MoveRight, Users } from 'lucide-angular';
import { Button } from 'primeng/button';
import { ADVANTAGES } from '@features/landing/data/advantages.data';

@Component({
  selector: 'app-onestop',
  imports: [RouterLink, Button, LucideAngularModule, NgOptimizedImage],
  templateUrl: './onestop.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Onestop {
  advantages = ADVANTAGES;
  categories = ['Formation', 'Financement', 'Mentorat', 'Incubation', 'Accélération'];
  icons = {
    moveRight: MoveRight,
    lightbulb: Lightbulb,
    users: Users,
    bookOpen: BookOpen
  };

  trackByIndex(index: number): number {
    return index;
  }

  trackByCategory(index: number, item: string): string {
    return item;
  }
}
