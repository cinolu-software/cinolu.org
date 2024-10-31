import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'environments/environment';

@Pipe({
  standalone: true,
  name: 'apiIMG'
})
export class ImgPipe implements PipeTransform {
  transform(value: object): string {
    if ('profile' in value) {
      return value['profile']
        ? `${environment.apiUrl}uploads/profiles/${value['profile']}`
        : (value['google_image'] ?? 'https://placehold.co/600x700');
    }
    if ('image' in value) {
      return value['image'] ? `${environment.apiUrl}uploads/programs/${value['image']}` : '/images/no-image.jpg';
    }
    return '/images/no-image.jpg';
  }
}
