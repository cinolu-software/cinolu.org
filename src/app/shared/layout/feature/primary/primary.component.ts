import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subject } from 'rxjs';
import { LoadingBarComponent } from '../../../ui/loading-bar/loading-bar.component';
import { FooterComponent } from '../../ui/footer/footer.component';
import { TopbarComponent } from '../../ui/topbar/topbar.component';

@Component({
  selector: 'app-primary-layout',
  templateUrl: './primary.component.html',
  encapsulation: ViewEncapsulation.None,
  imports: [LoadingBarComponent, RouterOutlet, TopbarComponent, FooterComponent]
})
export class PrimaryLayoutComponent implements OnDestroy {
  #unsubscribeAll = new Subject();

  ngOnDestroy(): void {
    this.#unsubscribeAll.next(null);
    this.#unsubscribeAll.complete();
  }
}
