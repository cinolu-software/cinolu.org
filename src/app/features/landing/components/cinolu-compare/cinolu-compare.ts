import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, ArrowRight, Briefcase, TrendingUp, CheckCircle } from 'lucide-angular';
import { FadeInOnScrollDirective } from '../../../../shared/directives/animations-on-scroll.directive';

@Component({
  selector: 'app-cinolu-compare',
  imports: [RouterLink, LucideAngularModule, FadeInOnScrollDirective],
  templateUrl: './cinolu-compare.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CinoluCompare {
  icons = {
    arrowRight: ArrowRight,
    briefcase: Briefcase,
    trendingUp: TrendingUp,
    check: CheckCircle
  };

  entrepreneurBenefits = [
    'Accès à un réseau stratégique',
    'Mentorat personnalisé',
    "Programmes d'accélération",
    'Visibilité investisseurs',
    'Financements catalytiques'
  ];

  investorBenefits = [
    'Dealflow qualifié',
    'Startups filtrées',
    'Risque réduit via incubation',
    'Impact mesurable',
    'Opportunités co-investissement'
  ];
}
