import { Component, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subject } from 'rxjs';
import { LoadingBarComponent } from '../../../ui/loading-bar/loading-bar.component';
import { TopbarComponent } from '../../common/features/topbar/topbar.component';

@Component({
  selector: 'app-secondary-layout',
  templateUrl: './secondary.component.html',
  imports: [LoadingBarComponent, RouterOutlet, TopbarComponent]
})
export class SecondaryLayoutComponent implements OnDestroy {
  #unsubscribeAll = new Subject();

  ngOnDestroy(): void {
    this.#unsubscribeAll.next(null);
    this.#unsubscribeAll.complete();
  }
}
