import { Component, Input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  Award,
  FileBadge,
  Link,
  LucideAngularModule,
  MoveRight,
  Star,
  Tag,
  Users,
  Verified,
} from 'lucide-angular';
import { RouterLink } from '@angular/router';
import { IUser } from '../../../../shared/models/entities.models';
import { ApiImgPipe } from '../../../../shared/pipes/api-img.pipe';

@Component({
  selector: 'app-high-user-card',
  imports: [
    CommonModule,
    LucideAngularModule,
    RouterLink,
    ApiImgPipe,
    NgOptimizedImage,
  ],
  templateUrl: './high-user-card.html',
})
export class HighUserCard {
  @Input() entrepreneur!: IUser;

  icons = {
    MoveRight: MoveRight,
    users: Users,
    fileBadge: FileBadge,
    award: Award,
    tag: Tag,
    verified: Verified,
    link: Link,
    star: Star,
  };
}
