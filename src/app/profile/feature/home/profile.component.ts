import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ApiImgPipe } from '../../../shared/pipes/api-img.pipe';
import { ProfileInfoComponent } from '../info/info.component';
import { selectUser } from '../../../shared/store/auth/auth.reducers';
import { IUser } from '../../../shared/utils/types/models.type';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  imports: [ApiImgPipe, CommonModule, ProfileInfoComponent],
})
export class ProfileComponent implements OnInit {
  #store = inject(Store);
  user$: Observable<IUser | null> | undefined;
  accUrl = environment.accountUrl;

  ngOnInit(): void {
    this.user$ = this.#store.pipe(select(selectUser));
  }
}
