import { Component, Input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Award, LucideAngularModule, MoveRight, Star } from 'lucide-angular';
import { RouterLink } from '@angular/router';
import { Button } from 'primeng/button';
import { IUser } from '../../../../../../shared/models/entities.models';
import { ApiImgPipe } from "../../../../../../shared/pipes/api-img.pipe";

@Component({
  selector: 'app-entrepreneur-user-card',
  imports: [CommonModule, LucideAngularModule, NgOptimizedImage, RouterLink, Button, ApiImgPipe],
  templateUrl: './entrepreneur-user-card.html',
})
export class EntrepreneurUserCard {
  @Input() entrepreneur!: IUser;

  icons = {
    award: Award,
    verified: Star,
    moveRight: MoveRight,
  };
}
