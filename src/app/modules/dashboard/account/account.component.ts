import { TextFieldModule } from '@angular/cdk/text-field';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { IInfoPayload } from './types/info-payload.interface';
import { AccountStore } from './data-access/account.store';
import { Observable, Subject } from 'rxjs';
import { IUser } from 'app/core/types/models.interface';
import { Store } from '@ngrx/store';
import { selectUser } from 'app/core/auth/data-access/auth.reducers';
import { FuseAlertComponent } from '../../../../@fuse/components/alert/alert.component';
import { CommonModule } from '@angular/common';
import { IAccountStore } from './types/account-store.interface';
import { APIValiadationError } from '../../../core/pipes/api-validation-error.pipe';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { fuseAnimations } from '@fuse/animations';
import { FilePondModule, registerPlugin } from 'ngx-filepond';
import { FilePond, FilePondOptions } from 'filepond';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import { environment } from 'environments/environment.development';
import { authActions } from 'app/core/auth/data-access/auth.actions';
registerPlugin(FilePondPluginFileValidateType, FilePondPluginImagePreview);

@Component({
  selector: 'settings-account',
  templateUrl: './account.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
  standalone: true,
  providers: [AccountStore],
  imports: [
    FormsModule,
    FilePondModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    TextFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    FuseAlertComponent,
    CommonModule,
    MatProgressSpinnerModule,
    APIValiadationError
  ]
})
export class AccountComponent implements OnInit, OnDestroy {
  private _formBuilder: FormBuilder = inject(FormBuilder);
  private _store: Store = inject(Store);
  private _accountStore = inject(AccountStore);
  private _unsubscribeAll = new Subject();
  state$: Observable<IAccountStore> = this._accountStore.state$;
  user$: Observable<IUser> = this._store.select(selectUser);
  infoForm: FormGroup;
  securityForm: FormGroup;
  pondOptions: FilePondOptions = {
    name: 'thumb',
    allowFileTypeValidation: true,
    allowImagePreview: true,
    acceptedFileTypes: ['image/png', 'image/jpeg', 'image/webp'],
    labelIdle: 'Ajouter une photo ici (JPG, PNG, WEBP)',
    server: {
      url: environment.apiUrl,
      process: {
        url: 'users/image-profile',
        method: 'POST',
        withCredentials: true
      }
    }
  };

  constructor() {
    this.infoForm = this._formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone_number: ['', Validators.required],
      address: ['', Validators.required]
    });

    this.securityForm = this._formBuilder.group({
      old_password: [''],
      password: [''],
      password_confirm: ['']
    });
  }

  ngOnInit(): void {
    this.user$.subscribe((user) => {
      this.infoForm.patchValue({
        first_name: user.first_name,
        last_name: user.last_name,
        name: user.name,
        email: user.email,
        phone_number: user.phone_number,
        address: user.address
      });
    });
  }

  updateInfo(): void {
    const payload: IInfoPayload = this.infoForm.value;
    this._accountStore.$updateInfo(payload);
  }

  processFile(event: Event): void {
    if (!event['error']) this._store.dispatch(authActions.authenticate());
  }

  updatePassword(): void {
    const payload = this.securityForm.value;
    this._accountStore.$updateSecurity(payload);
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
