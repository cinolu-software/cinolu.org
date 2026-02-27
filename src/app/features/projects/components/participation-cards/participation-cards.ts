import { ChangeDetectionStrategy, Component, computed, inject, input, output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LucideAngularModule, ThumbsUp, Check, MapPin, Building2, Layers, Trash } from 'lucide-angular';
import { ApiImgPipe } from '@shared/pipes/api-img.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { AuthStore } from '@core/auth/auth.store';
import { ParticipationsStore } from '../../../dashboard/store/participations.store';
import { VoteStore } from '../../../dashboard/store/vote.store';
import type { IProject } from '@shared/models/entities.models';

@Component({
  selector: 'app-participation-cards',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, LucideAngularModule, ApiImgPipe, TranslateModule],
  templateUrl: './participation-cards.html'
})
export class ParticipationCards {
  participationsStore = inject(ParticipationsStore);
  voteStore = inject(VoteStore);
  authStore = inject(AuthStore);
  router = inject(Router);

  project = input<IProject | null>(null);

  authRequired = output<void>();

  canVote = computed(() => this.participationsStore.canVote(this.project()));
  voteClos = computed(() => !this.canVote());
  isAuthenticated = computed(() => this.authStore.user() != null);

  icons = {
    thumbsUp: ThumbsUp,
    check: Check,
    mapPin: MapPin,
    building2: Building2,
    layers: Layers,
    trash: Trash
  };

  onVoteClick(participationId: string): void {
    if (!this.isAuthenticated()) {
      this.authRequired.emit();
      return;
    }
    this.voteStore.upvote(participationId);
  }

  removeVote(participationId: string): void {
    this.voteStore.removeVote(participationId);
  }
}
