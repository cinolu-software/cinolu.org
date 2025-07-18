import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../environments/environment';

@Pipe({
  name: 'apiIMG'
})
export class ApiImgPipe implements PipeTransform {
  transform(v: unknown, key: string): string {
    const apiUrl = environment.apiUrl;
    const value = v as Record<string, string>;
    const images: Record<string, string> = {
      user: value['profile']
        ? `${apiUrl}uploads/dashboards/${value['profile']}`
        : (value['google_image'] ?? '/images/avatar-default.webp'),
      project: value['cover'] ? `${apiUrl}uploads/projects/${value['cover']}` : '/images/no-image.jpg',
      enterprise: value['logo'] ? `${apiUrl}uploads/enterprises/logos/${value['logo']}` : '/images/no-image.jpg',
      enterpriseCover: value['cover']
        ? `${apiUrl}uploads/enterprises/covers/${value['cover']}`
        : '/images/no-image.jpg',
      product: value['image'] ? `${apiUrl}uploads/products/images/${value['image']}` : '/images/no-image.jpg',
      post: value['image'] ? `${apiUrl}uploads/posts/${value['image']}` : '/images/no-image.jpg',
      event: value['cover'] ? `${apiUrl}uploads/events/${value['cover']}` : '/images/no-image.jpg'
    };
    return images[key];
  }
}
