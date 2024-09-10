import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [RouterOutlet]
})
export class AppComponent {
  // private _authService = inject(AuthService);
  // private _router = inject(Router);
  // ngOnInit(): void {
  //   this._authService.check().pipe(
  //     map((auth) => this._router.navigate([auth ? '/' : '/login'])),
  //     catchError(() => of())
  //   );
  // }
}
