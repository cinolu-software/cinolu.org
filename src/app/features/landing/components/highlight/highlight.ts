import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, MoveUpRight, UserPlus, Users } from 'lucide-angular';
import { CountUpDirective } from '../../../../shared/directives/count-up.directive';

@Component({
  selector: 'app-highlight',
  imports: [LucideAngularModule, NgOptimizedImage, RouterLink, CountUpDirective],
  templateUrl: './highlight.html',
})
export class Highlight {
  icons = {
    moveUp: MoveUpRight,
    userPlus: UserPlus,
    users: Users,
  };
}
