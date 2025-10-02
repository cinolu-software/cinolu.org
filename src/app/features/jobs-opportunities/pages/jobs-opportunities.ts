import { Component } from '@angular/core';
import { HeroCard } from '../../../layout/components/hero-card/hero-card';
import { Briefcase, LucideAngularModule } from 'lucide-angular';
import { JOBS_DATA } from '../data/job.data';

@Component({
  selector: 'app-jobs-opportunities',
  imports: [HeroCard, LucideAngularModule],
  templateUrl: './jobs-opportunities.html',
  styles: ``,
})
export class JobsOpportunities {
  icons = { briefcase: Briefcase };
  jobs = JOBS_DATA;
}
