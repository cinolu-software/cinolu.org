import { Component, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subject } from 'rxjs';
import { TopbarComponent } from '../../ui/topbar/topbar.component';
import { FooterComponent } from '../../ui/footer/footer.component';

@Component({
  selector: 'app-full-layout',
  templateUrl: './full.component.html',
  imports: [RouterOutlet, TopbarComponent, FooterComponent],
})
export class FullLayoutComponent implements OnDestroy {
  #unsubscribeAll = new Subject();

  ngOnDestroy(): void {
    this.#unsubscribeAll.next(null);
    this.#unsubscribeAll.complete();
  }
}
