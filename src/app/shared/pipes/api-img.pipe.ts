import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'environments/environment';

@Pipe({
  name: 'apiIMG'
})
export class ApiImgPipe implements PipeTransform {
  transform(value: object, key: string): string {
    const apiUrl = environment.apiUrl;

    if (key === 'user') {
      return value['profile']
        ? `${apiUrl}uploads/profiles/${value['profile']}`
        : (value['google_image'] ?? '/images/avatar-default.webp');
    }

    if (key === 'program') {
      return value['image'] ? `${apiUrl}uploads/programs/${value['image']}` : '/images/no-image.jpg';
    }

    if (key === 'venture') {
      return value['image'] ? `${apiUrl}uploads/ventures/${value['image']}` : '/images/no-image.jpg';
    }

    if (key === 'partner') {
      return value['profile'] ? `${apiUrl}uploads/partners/${value['profile']}` : '/images/no-image.jpg';
    }

    if (key === 'event') {
      return value['image'] ? `${apiUrl}uploads/events/${value['image']}` : '/images/no-image.jpg';
    }
    return '/images/no-image.jpg';
  }
}
