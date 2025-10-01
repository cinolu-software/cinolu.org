import { Component } from '@angular/core';
import { LucideAngularModule, Users } from 'lucide-angular';
import { HeroCard } from '../../../layout/components/hero-card/hero-card';
import { ENTREPRENEURS_DATA } from '../data/entrepreneurs.data';
import { ComponyCard } from "../components/compony-card/compony-card";

@Component({
  selector: 'app-our-entrepreneurs',
  imports: [LucideAngularModule, HeroCard, ComponyCard],
  templateUrl: './our-entrepreneurs.html',
})
export class OurEntrepreneurs {
  icons = { users: Users };
  entrepreneurs = ENTREPRENEURS_DATA;
}
