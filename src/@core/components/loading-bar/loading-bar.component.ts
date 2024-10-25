import { coerceBooleanProperty } from '@angular/cdk/coercion';

import {
  Component,
  inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Subject, takeUntil } from 'rxjs';
import { LoadingService } from '@core/services/loading/loading.service';

@Component({
  selector: 'app-loading-bar',
  templateUrl: './loading-bar.component.html',
  styleUrls: ['./loading-bar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [MatProgressBarModule]
})
export class LoadingBarComponent implements OnChanges, OnInit, OnDestroy {
  #loadingService = inject(LoadingService);
  #unsubscribeAll = new Subject();

  @Input() autoMode = true;
  mode: 'determinate' | 'indeterminate';
  progress = 0;
  show = false;

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On changes
   *
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    // Auto mode
    if ('autoMode' in changes) {
      // Set the auto mode in the service
      this.#loadingService.setAutoMode(coerceBooleanProperty(changes.autoMode.currentValue));
    }
  }

  /**
   * On init
   */
  ngOnInit(): void {
    // Subscribe to the service
    this.#loadingService.mode$.pipe(takeUntil(this.#unsubscribeAll)).subscribe((value) => {
      this.mode = value;
    });

    this.#loadingService.progress$.pipe(takeUntil(this.#unsubscribeAll)).subscribe((value) => {
      this.progress = value;
    });

    this.#loadingService.show$.pipe(takeUntil(this.#unsubscribeAll)).subscribe((value) => {
      this.show = value;
    });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this.#unsubscribeAll.next(null);
    this.#unsubscribeAll.complete();
  }
}
