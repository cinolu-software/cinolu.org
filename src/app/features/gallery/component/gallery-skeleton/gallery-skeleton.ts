import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gallery-skeleton',
  imports: [CommonModule],
  templateUrl: './gallery-skeleton.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GallerySkeleton {
  count = input<number>(8);

  get placeholders() {
    return new Array(this.count);
  }

  trackByIndex(index: number) {
    return index;
  }
}
