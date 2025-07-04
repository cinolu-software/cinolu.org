import { Component, input, OnInit, output } from '@angular/core';
import { FilePondModule, registerPlugin } from 'ngx-filepond';
import validateType from 'filepond-plugin-file-validate-type';
import validateSize from 'filepond-plugin-file-validate-size';
import imagePreview from 'filepond-plugin-image-preview';
registerPlugin(imagePreview, validateType, validateSize);

@Component({
  selector: 'app-file-upload',
  imports: [FilePondModule],
  templateUrl: './file-upload.component.html'
})
export class FileUploadComponent implements OnInit {
  name = input.required<string>();
  url = input.required<string | null>();
  loaded = output<void>();
  pondOptions: unknown;

  ngOnInit(): void {
    this.pondOptions = {
      name: this.name(),
      labelIdle: 'Cliquez ici',
      acceptedFileTypes: 'image/jpeg, image/png, image/webp',
      maxFileSize: '1MB',
      allowImagePreview: true,
      allowFileSizeValidation: true,
      credits: false,
      instantUpload: false,
      allowRemove: true,
      server: {
        process: {
          url: this.url(),
          method: 'POST',
          withCredentials: true,
          onload: () => {
            this.handleLoaded();
          }
        }
      }
    };
  }

  handleLoaded(): void {
    this.loaded.emit();
  }
}
