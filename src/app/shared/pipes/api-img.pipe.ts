import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'environments/environment';

@Pipe({
  name: 'apiIMG'
})
export class ApiImgPipe implements PipeTransform {
  transform(value: object, key: string): string {
    const apiUrl = environment.apiUrl;
    const images = {
      user: value['profile']
        ? `${apiUrl}uploads/profiles/${value['profile']}`
        : (value['google_image'] ?? '/images/avatar-default.webp'),
      program: value['image'] ? `${apiUrl}uploads/programs/${value['image']}` : '/images/no-image.jpg',
      venture: value['image'] ? `${apiUrl}uploads/ventures/${value['image']}` : '/images/no-image.jpg',
      partner: value['profile'] ? `${apiUrl}uploads/partners/${value['profile']}` : '/images/no-image.jpg',
      event: value['image'] ? `${apiUrl}uploads/events/${value['image']}` : '/images/no-image.jpg'
    };
    return images[key];
  }
}
