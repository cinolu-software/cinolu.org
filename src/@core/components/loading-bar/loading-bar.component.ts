import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  ChangeDetectorRef,
  Component,
  inject,
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
  #cdr = inject(ChangeDetectorRef);

  mode: 'determinate' | 'indeterminate';
  progress = 0;
  show = false;

  ngOnChanges(changes: SimpleChanges): void {
    if ('autoMode' in changes) {
      this.#loadingService.setAutoMode(coerceBooleanProperty(changes.autoMode.currentValue));
    }
  }

  ngOnInit(): void {
    this.#loadingService.mode$.pipe(takeUntil(this.#unsubscribeAll)).subscribe((value) => {
      this.mode = value;
      this.#cdr.detectChanges();
    });

    this.#loadingService.progress$.pipe(takeUntil(this.#unsubscribeAll)).subscribe((value) => {
      this.progress = value;
      this.#cdr.detectChanges();
    });

    this.#loadingService.show$.pipe(takeUntil(this.#unsubscribeAll)).subscribe((value) => {
      this.show = value;
      this.#cdr.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.#unsubscribeAll.next(null);
    this.#unsubscribeAll.complete();
  }
}
