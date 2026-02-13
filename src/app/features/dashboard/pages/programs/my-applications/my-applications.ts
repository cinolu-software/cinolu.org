import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ParticipationsStore } from '../../../store/participations.store';
import { ApiImgPipe } from "../../../../../shared/pipes/api-img.pipe";

@Component({
  selector: 'app-my-applications',
  standalone: true,
  imports: [CommonModule, RouterLink, ApiImgPipe],
  providers: [],
  templateUrl: './my-applications.html',
  styleUrls: []
})
export class MyApplications implements OnInit {
  participationsStore = inject(ParticipationsStore);

  ngOnInit(): void {
    this.participationsStore.myParticipations();
  }
}
