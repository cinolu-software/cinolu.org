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
      project: value['image'] ? `${apiUrl}uploads/projects/${value['image']}` : '/images/no-image.jpg',
      post: value['image'] ? `${apiUrl}uploads/posts/${value['image']}` : '/images/no-image.jpg',
      organization: value['member'] ? `${apiUrl}uploads/members/${value['logo']}` : '/images/no-image.jpg',
      event: value['image'] ? `${apiUrl}uploads/events/${value['image']}` : '/images/no-image.jpg'
    };
    return images[key];
  }
}
