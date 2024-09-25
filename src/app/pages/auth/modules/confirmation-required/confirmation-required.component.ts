import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { team } from 'app/pages/landing/data/team';

@Component({
  selector: 'auth-confirmation-required',
  templateUrl: './confirmation-required.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
  standalone: true,
  imports: [RouterLink, CommonModule, NgOptimizedImage]
})
export class AuthConfirmationRequiredComponent {
  team = team;
}
