import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { team } from 'app/modules/landing/data/team';
import { FooterComponent } from '../../../core/components/footer/footer.component';
import { TopbarComponent } from '../../../core/components/topbar/topbar.component';

@Component({
  selector: 'auth-confirmation-required',
  templateUrl: './confirmation-required.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
  standalone: true,
  imports: [RouterLink, CommonModule, NgOptimizedImage, FooterComponent, TopbarComponent]
})
export class AuthConfirmationRequiredComponent {
  team = team;
}
