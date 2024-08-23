import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { authActions } from './core/auth/data-access/auth.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [RouterOutlet]
})
export class AppComponent {
  private _store: Store = inject(Store);

  ngOnInit(): void {
    this._store.dispatch(authActions.authenticate());
  }
}
