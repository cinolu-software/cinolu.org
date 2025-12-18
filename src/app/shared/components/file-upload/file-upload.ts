import { Component, input, OnInit, output, viewChild, ChangeDetectionStrategy, inject } from '@angular/core';
import { FilePondComponent, FilePondModule, registerPlugin } from 'ngx-filepond';
import validateType from 'filepond-plugin-file-validate-type';
import validateSize from 'filepond-plugin-file-validate-size';
import imagePreview from 'filepond-plugin-image-preview';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
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
  http = inject(HttpClient);

  ngOnInit(): void {
    this.pondOptions = {
      name: this.name(),
      acceptedFileTypes: ['image/jpeg', 'image/png', 'image/webp'],
      maxFileSize: '1MB',
      allowImagePreview: !this.multiple(),
      allowFileSizeValidation: true,
      credits: false,
      instantUpload: !this.multiple(),
      allowRemove: true,
      allowRevert: false,
      allowMultiple: this.multiple(),
      imagePreviewHeight: 200,
      labelIdle: `
        <div class="filepond-custom-label">
          <span class="material-icons" style="font-size: 48px; color: #5d9c46;">cloud_upload</span>
          <p style="margin: 8px 0; font-weight: 600; color: #2b4225;">Glissez-déposez votre image ici</p>
          <p style="margin: 0; font-size: 14px; color: #7cb764;">ou <span style="color: #5d9c46; text-decoration: underline;">parcourir</span></p>
        </div>
      `,
      server: {
        process: (
          fieldName: string,
          file: File,
          metadata: unknown,
          load: (p: string | unknown) => void,
          error: (errorText: string) => void,
          progress: (computable: boolean, loadedSize: number, totalSize: number) => void,
          abort: () => void
        ) => {
          const formData = new FormData();
          formData.append(this.name(), file, file.name);

          const request = this.http
            .post<{
              cover?: string;
              logo?: string;
              image?: string;
              id?: string;
            }>(this.url(), formData, { reportProgress: true, observe: 'events' })
            .subscribe({
              next: (event: HttpEvent<{ cover?: string; logo?: string; image?: string; id?: string }>) => {
                if (event.type === HttpEventType.Response) {
                  const response = event.body;
                  const fileId = response?.cover || response?.logo || response?.image || response?.id || file.name;
                  load(fileId);
                  this.handleLoaded();
                } else if (event.type === HttpEventType.UploadProgress && event.total) {
                  progress(true, event.loaded, event.total);
                }
              },
              error: () => {
                error('Erreur lors du téléchargement');
              }
            });

          return {
            abort: () => {
              request.unsubscribe();
              abort();
            }
          };
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
