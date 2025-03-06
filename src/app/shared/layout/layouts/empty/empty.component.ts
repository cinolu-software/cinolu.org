import { Component, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subject } from 'rxjs';
import { LoadingBarComponent } from '../../../ui/loading-bar/loading-bar.component';

@Component({
  selector: 'app-empty-layout',
  templateUrl: './empty.component.html',
  imports: [LoadingBarComponent, RouterOutlet]
})
export class EmptyLayoutComponent implements OnDestroy {
  #unsubscribeAll = new Subject();

  ngOnDestroy(): void {
    this.#unsubscribeAll.next(null);
    this.#unsubscribeAll.complete();
  }
}
