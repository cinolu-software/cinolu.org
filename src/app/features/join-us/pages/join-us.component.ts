import { Component } from '@angular/core';
import { MEMBER_ITEMS } from '../data/member.items';
import { LucideAngularModule } from 'lucide-angular';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-join-us',
  imports: [LucideAngularModule, RouterLink],
  templateUrl: './join-us.component.html',
  styles: ``
})
export class JoinUsComponent {
  memberItems = MEMBER_ITEMS;
}
