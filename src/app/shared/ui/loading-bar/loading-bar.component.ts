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
import { Subject, takeUntil } from 'rxjs';
import { LoadingService } from 'app/shared/services/loading/loading.service';
import { CommonModule } from '@angular/common';
import { ProgressBar } from 'primeng/progressbar';

@Component({
  selector: 'app-loading-bar',
  templateUrl: './loading-bar.component.html',
  encapsulation: ViewEncapsulation.None,
  imports: [ProgressBar, CommonModule]
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
