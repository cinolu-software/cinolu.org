import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BookOpen, Lightbulb, LucideAngularModule, MoveRight, Users } from 'lucide-angular';
import { Button } from 'primeng/button';
import { AdvantageCard } from "../composant/advantage-card/advantage-card";
import { ADVANTAGES } from '../data/advantages.data';

@Component({
  selector: 'app-one-stop',
  imports: [RouterLink, Button, LucideAngularModule, NgOptimizedImage, AdvantageCard],
  templateUrl: './one-stop.html'
})
export class OneStop {

  advantages = ADVANTAGES;
  icons = {
    moveRight: MoveRight,
    lightbulb: Lightbulb,
    users: Users,
    bookOpen: BookOpen,
  };
}
