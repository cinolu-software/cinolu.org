import { TextFieldModule } from '@angular/cdk/text-field';
import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { FuseAlertComponent } from '../../../../@fuse/components/alert/alert.component';
import { CommonModule } from '@angular/common';
import { APIValiadationError } from '../../../core/pipes/api-validation-error.pipe';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { fuseAnimations } from '@fuse/animations';
import { FilePondModule, registerPlugin } from 'ngx-filepond';
import { FilePondOptions } from 'filepond';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import { environment } from 'environments/environment.development';
registerPlugin(FilePondPluginFileValidateType, FilePondPluginImagePreview);

@Component({
  selector: 'settings-account',
  templateUrl: './account.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
  standalone: true,
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
  private _unsubscribeAll = new Subject();
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

  ngOnInit(): void {}

  updateInfo(): void {
    // const payload: IInfoPayload = this.infoForm.value;
  }

  processFile(event: Event): void {
    // if (!event['error']) this._store.dispatch(authActions.authenticate());
  }

  updatePassword(): void {
    // const payload = this.securityForm.value;
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
