import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, booleanAttribute, input } from '@angular/core';
import { LucideAngularModule, Loader2 } from 'lucide-angular';

@Component({
  selector: 'ui-button',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './button.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly variant = input<'primary' | 'secondary' | 'danger' | 'ghost'>('primary');
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  readonly loading = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly fullWidth = input(false, { transform: booleanAttribute });

  protected readonly loaderIcon = Loader2;

  protected readonly variantClasses: Record<string, string> = {
    primary:
      'bg-primary-600 text-white border-primary-600 hover:bg-primary-700 hover:border-primary-700 shadow-sm shadow-primary-600/20',
    secondary: 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300 shadow-sm',
    danger: 'bg-red-600 text-white border-red-600 hover:bg-red-700 hover:border-red-700 shadow-sm shadow-red-600/20',
    ghost: 'bg-transparent text-slate-700 border-transparent hover:bg-slate-100'
  };

  protected readonly sizeClasses: Record<string, string> = {
    sm: 'min-h-9 px-3.5 text-sm',
    md: 'min-h-11 px-4 text-sm',
    lg: 'min-h-12 px-5 text-base'
  };
}
