import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { Location } from '@angular/common';
import { ArrowLeft, LucideAngularModule } from 'lucide-angular';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-back-button',
  imports: [LucideAngularModule, TranslateModule],
  templateUrl: './back-button.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BackButton {
  icons = {
    back: ArrowLeft
  };

  #location = inject(Location);

  onGoBack(): void {
    this.#location.back();
  }
}
