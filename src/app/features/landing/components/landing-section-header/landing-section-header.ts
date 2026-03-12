import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-landing-section-header',
  imports: [TranslateModule, NgClass],
  templateUrl: './landing-section-header.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingSectionHeader {
  @Input() badgeKey!: string;
  @Input() titleKey!: string;
  @Input() titleHighlightKey?: string;
  @Input() descriptionKey?: string;
  @Input() descriptionParams?: Record<string, unknown>;
  @Input() descriptionClass?: string;
}
