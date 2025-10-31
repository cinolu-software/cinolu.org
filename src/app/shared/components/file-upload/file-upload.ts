import { Component, input, OnInit, output, viewChild, ChangeDetectionStrategy } from '@angular/core';
import { FilePondComponent, FilePondModule, registerPlugin } from 'ngx-filepond';
import validateType from 'filepond-plugin-file-validate-type';
import validateSize from 'filepond-plugin-file-validate-size';
import imagePreview from 'filepond-plugin-image-preview';
registerPlugin(imagePreview, validateType, validateSize);

@Component({
  selector: 'app-file-upload',
  imports: [FilePondModule],
  templateUrl: './file-upload.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileUpload implements OnInit {
  pond = viewChild<FilePondComponent>('pond');
  name = input.required<string>();
  url = input.required<string>();
  multiple = input<boolean>(false);
  loaded = output<void>();
  pondOptions: unknown;

  ngOnInit(): void {
    this.pondOptions = {
      name: this.name(),
      acceptedFileTypes: 'image/jpeg, image/png, image/webp',
      maxFileSize: '1MB',
      allowImagePreview: !this.multiple(),
      allowFileSizeValidation: true,
      credits: false,
      instantUpload: this.multiple(),
      allowRemove: true,
      allowMultiple: this.multiple(),
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
    setTimeout(() => {
      this.pond()?.['pond']?.removeFiles();
    }, 3000);
    this.loaded.emit();
  }
}
