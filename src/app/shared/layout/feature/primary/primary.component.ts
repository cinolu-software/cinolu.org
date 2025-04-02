import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subject } from 'rxjs';
import { FooterComponent } from '../../ui/footer/footer.component';
import { TopbarComponent } from '../../ui/topbar/topbar.component';

@Component({
  selector: 'app-primary-layout',
  templateUrl: './primary.component.html',
  encapsulation: ViewEncapsulation.None,
  imports: [RouterOutlet, TopbarComponent, FooterComponent]
})
export class PrimaryLayoutComponent implements OnDestroy {
  #unsubscribeAll = new Subject();

  ngOnDestroy(): void {
    this.#unsubscribeAll.next(null);
    this.#unsubscribeAll.complete();
  }
}
