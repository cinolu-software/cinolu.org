import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightCard } from '../../../highlights/component/highlight-card/highlight-card';
import { HighlightsStore } from '../../../highlights/store/highlights.store';

@Component({
  selector: 'app-highlights',
  standalone: true,
  imports: [CommonModule, HighlightCard],
  providers: [HighlightsStore],
  templateUrl: './highlights.html',
})
export class Highlights implements OnInit {
  private store = inject(HighlightsStore);

  highlights = this.store.highlights;
  isLoading = this.store.isLoading;

  ngOnInit(): void {
    this.store.loadHighlights();
  }
}
