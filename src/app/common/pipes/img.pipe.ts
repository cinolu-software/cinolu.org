import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'environments/environment';

type Key = 'user' | 'program';

@Pipe({
  standalone: true,
  name: 'apiIMG'
})
export class ImgPipe implements PipeTransform {
  transform(value: object, key: Key): string {
    const apiUrl = environment.apiUrl;
    const defaultImages = {
      user: '/images/avatar-default.webp',
      default: 'https://placehold.co/620x700'
    };

    if (key === 'user') {
      return value['profile']
        ? `${apiUrl}uploads/profiles/${value['profile']}`
        : (value['google_image'] ?? defaultImages.user);
    }

    if (key === 'program') {
      return value['image'] ? `${apiUrl}uploads/programs/${value['image']}` : '/images/no-image.jpg';
    }
    return '/images/no-image.jpg';
  }
}
