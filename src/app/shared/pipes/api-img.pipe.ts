import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../environments/environment';

@Pipe({
  name: 'apiIMG',
})
export class ApiImgPipe implements PipeTransform {
  transform(v: unknown, key: string): string {
    const apiUrl = environment.apiUrl;
    const value = v as Record<string, string>;
    const images: Record<string, string> = {
      program: value['logo'] ? `${apiUrl}uploads/programs/${value['logo']}` : '/images/no-image.jpg',
      gallery: `${apiUrl}uploads/galleries/${value['image']}`,
      subprogram: value['logo'] ? `${apiUrl}uploads/subprograms/${value['logo']}` : '/images/no-image.jpg',
      user: value['profile']
        ? `${apiUrl}uploads/profiles/${value['profile']}`
        : (value['google_image'] ?? '/images/avatar-default.webp'),
      project: value['cover'] ? `${apiUrl}uploads/projects/${value['cover']}` : '/images/no-image.jpg',
      venture: value['logo'] ? `${apiUrl}uploads/ventures/logos/${value['logo']}` : '/images/no-image.jpg',
      ventureCover: value['cover'] ? `${apiUrl}uploads/ventures/covers/${value['cover']}` : '/images/no-image.jpg',
      product: value['image'] ? `${apiUrl}uploads/products/images/${value['image']}` : '/images/no-image.jpg',
      article: value['image'] ? `${apiUrl}uploads/articles/${value['image']}` : '/images/no-image.jpg',
      event: value['cover'] ? `${apiUrl}uploads/events/${value['cover']}` : '/images/no-image.jpg',
    };
    return images[key];
  }
}
