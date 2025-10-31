import { Pipe, PipeTransform } from '@angular/core';
import { ILink } from '../../layout/data/links.data';

@Pipe({
  name: 'getLinks',
  pure: true
})
export class GetLinksPipe implements PipeTransform {
  transform(links: Record<string, ILink[]>, tab: string): ILink[] {
    return links[tab];
  }
}
