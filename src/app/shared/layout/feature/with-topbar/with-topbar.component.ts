import { Component, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subject } from 'rxjs';
import { TopbarComponent } from '../../ui/topbar/topbar.component';

@Component({
  selector: 'app-with-topbar-layout',
  templateUrl: './with-topbar.component.html',
  imports: [RouterOutlet, TopbarComponent],
})
export class WithTopbarLayoutComponent implements OnDestroy {
  #unsubscribeAll = new Subject();

  ngOnDestroy(): void {
    this.#unsubscribeAll.next(null);
    this.#unsubscribeAll.complete();
  }
}
