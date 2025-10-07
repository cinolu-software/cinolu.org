import { Component, Input } from '@angular/core';
import { IEntrepreneur } from '../../data/entrepreneurs.data';
import { CommonModule } from '@angular/common';
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

@Component({
  selector: 'app-high-user-card',
  imports: [CommonModule, LucideAngularModule, RouterLink],
  templateUrl: './high-user-card.html',
})
export class HighUserCard {
  @Input() entrepreneur!: IEntrepreneur;

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
