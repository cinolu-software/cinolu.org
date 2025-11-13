import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { BookOpen, Lightbulb, LucideAngularModule, MoveRight, Users } from 'lucide-angular';
import { Button } from 'primeng/button';
import { ADVANTAGES } from '@features/landing/data/advantages.data';

@Component({
  selector: 'app-onestop',
  imports: [RouterLink, Button, LucideAngularModule, NgOptimizedImage, TranslateModule],
  templateUrl: './onestop.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Onestop {
  advantages = ADVANTAGES;
  categoryKeys = ['formation', 'financement', 'mentorat', 'incubation', 'acceleration'];
  icons = {
    moveRight: MoveRight,
    lightbulb: Lightbulb,
    users: Users,
    bookOpen: BookOpen
  };

  trackByIndex(index: number): number {
    return index;
  }

  trackByCategoryKey(index: number, key: string): string {
    return key;
  }
}
