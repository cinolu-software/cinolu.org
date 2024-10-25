import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';

import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation,
  inject
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Animations } from '@core/animations';
import { AlertService } from '@core/components/alert/alert.service';
import { AlertAppearance, AlertType } from '@core/components/alert/alert.types';
import { UtilsService } from '@core/services/utils/utils.service';
import { Subject, filter, takeUntil } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: Animations,
  imports: [MatIconModule, MatButtonModule]
})
export class AlertComponent implements OnChanges, OnInit, OnDestroy {
  static ngAcceptInputType_dismissible: BooleanInput;
  static ngAcceptInputType_dismissed: BooleanInput;
  static ngAcceptInputType_showIcon: BooleanInput;
  #unsubscribeAll = new Subject();
  #changeDetectorRef = inject(ChangeDetectorRef);
  #alertService = inject(AlertService);
  #utilsService = inject(UtilsService);

  @Input() appearance: AlertAppearance = 'soft';
  @Input() dismissed = false;
  @Input() dismissible = false;
  @Input() name: string = this.#utilsService.randomId();
  @Input() showIcon = true;
  @Input() type: AlertType = 'primary';
  @Output() readonly dismissedChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Host binding for component classes
   */
  @HostBinding('class') get classList() {
    return {
      'alert-appearance-border': this.appearance === 'border',
      'alert-appearance-fill': this.appearance === 'fill',
      'alert-appearance-outline': this.appearance === 'outline',
      'alert-appearance-soft': this.appearance === 'soft',
      'alert-dismissed': this.dismissed,
      'alert-dismissible': this.dismissible,
      'alert-show-icon': this.showIcon,
      'alert-type-primary': this.type === 'primary',
      'alert-type-accent': this.type === 'accent',
      'alert-type-warn': this.type === 'warn',
      'alert-type-basic': this.type === 'basic',
      'alert-type-info': this.type === 'info',
      'alert-type-success': this.type === 'success',
      'alert-type-warning': this.type === 'warning',
      'alert-type-error': this.type === 'error'
    };
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On changes
   *
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    // Dismissed
    if ('dismissed' in changes) {
      // Coerce the value to a boolean
      this.dismissed = coerceBooleanProperty(changes.dismissed.currentValue);

      // Dismiss/show the alert
      this._toggleDismiss(this.dismissed);
    }

    // Dismissible
    if ('dismissible' in changes) {
      // Coerce the value to a boolean
      this.dismissible = coerceBooleanProperty(changes.dismissible.currentValue);
    }

    // Show icon
    if ('showIcon' in changes) {
      // Coerce the value to a boolean
      this.showIcon = coerceBooleanProperty(changes.showIcon.currentValue);
    }
  }

  /**
   * On init
   */
  ngOnInit(): void {
    // Subscribe to the dismiss calls
    this.#alertService.onDismiss
      .pipe(
        filter((name) => this.name === name),
        takeUntil(this.#unsubscribeAll)
      )
      .subscribe(() => {
        // Dismiss the alert
        this.dismiss();
      });

    // Subscribe to the show calls
    this.#alertService.onShow
      .pipe(
        filter((name) => this.name === name),
        takeUntil(this.#unsubscribeAll)
      )
      .subscribe(() => {
        // Show the alert
        this.show();
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

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Dismiss the alert
   */
  dismiss(): void {
    // Return if the alert is already dismissed
    if (this.dismissed) {
      return;
    }

    // Dismiss the alert
    this._toggleDismiss(true);
  }

  /**
   * Show the dismissed alert
   */
  show(): void {
    // Return if the alert is already showing
    if (!this.dismissed) {
      return;
    }

    // Show the alert
    this._toggleDismiss(false);
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Dismiss/show the alert
   *
   * @param dismissed
   * @private
   */
  private _toggleDismiss(dismissed: boolean): void {
    // Return if the alert is not dismissible
    if (!this.dismissible) {
      return;
    }

    // Set the dismissed
    this.dismissed = dismissed;

    // Execute the observable
    this.dismissedChanged.next(this.dismissed);

    // Notify the change detector
    this.#changeDetectorRef.markForCheck();
  }
}
