import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'app-gallery-skeleton',
  imports: [],
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
