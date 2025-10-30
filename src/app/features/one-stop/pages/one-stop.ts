import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BookOpen, Goal, Lightbulb, LucideAngularModule, MoveRight } from 'lucide-angular';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-one-stop',
  imports: [RouterLink, Button, LucideAngularModule, NgOptimizedImage],
  templateUrl: './one-stop.html'
})
export class OneStop {
  icons = {
    moveRight: MoveRight,
    lightbulb: Lightbulb,
    goal: Goal,
    bookOpen: BookOpen
  };
}
