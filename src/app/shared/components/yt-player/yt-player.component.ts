import { afterNextRender, ChangeDetectorRef, Component, ElementRef, inject, input, viewChild } from '@angular/core';
import { YouTubePlayer } from '@angular/youtube-player';

@Component({
  selector: 'app-yt-player',
  imports: [YouTubePlayer],
  templateUrl: './yt-player.component.html',
})
export class YtPlayerComponent {
  youTubePlayer = viewChild<ElementRef<HTMLDivElement>>('youTubePlayer');
  videoID = input.required<string>();
  videoHeight: number | undefined;
  videoWidth: number | undefined;
  #changeDetectorRef = inject(ChangeDetectorRef);

  constructor() {
    afterNextRender(() => {
      this.onResize();
      window.addEventListener('resize', this.onResize.bind(this));
    });
  }

  onResize(): void {
    const clientWidth = this.youTubePlayer()?.nativeElement?.clientWidth;
    if (!clientWidth) return;
    this.videoWidth = Math.min(clientWidth, 1200);
    this.videoHeight = this.videoWidth * 0.6;
    this.#changeDetectorRef.detectChanges();
  }
}
