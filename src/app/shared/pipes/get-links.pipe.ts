import { Pipe, PipeTransform } from '@angular/core';
import { ILink } from '../utils/types/link.type';

@Pipe({
  name: 'getLinks'
})
export class GetLinksPipe implements PipeTransform {
  transform(links: Record<string, ILink[]>, tab: string): ILink[] {
    return links[tab];
  }
}
