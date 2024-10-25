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
  selector: 'app-fuse-loading-bar',
  templateUrl: './loading-bar.component.html',
  styleUrls: ['./loading-bar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  exportAs: 'fuseLoadingBar',
  standalone: true,
  imports: [MatProgressBarModule]
})
export class FuseLoadingBarComponent implements OnChanges, OnInit, OnDestroy {
  private _fuseLoadingService = inject(LoadingService);

  @Input() autoMode = true;
  mode: 'determinate' | 'indeterminate';
  progress = 0;
  show = false;
  private _unsubscribeAll = new Subject();

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
      this._fuseLoadingService.setAutoMode(coerceBooleanProperty(changes.autoMode.currentValue));
    }
  }

  /**
   * On init
   */
  ngOnInit(): void {
    // Subscribe to the service
    this._fuseLoadingService.mode$.pipe(takeUntil(this._unsubscribeAll)).subscribe((value) => {
      this.mode = value;
    });

    this._fuseLoadingService.progress$.pipe(takeUntil(this._unsubscribeAll)).subscribe((value) => {
      this.progress = value;
    });

    this._fuseLoadingService.show$.pipe(takeUntil(this._unsubscribeAll)).subscribe((value) => {
      this.show = value;
    });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
