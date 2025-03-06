import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subject } from 'rxjs';
import { LoadingBarComponent } from '../../../ui/loading-bar/loading-bar.component';
import { TopbarComponent } from '../../common/features/topbar/topbar.component';
import { FooterComponent } from '../../common/features/footer/footer.component';

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
