import { ILink } from '../types/link.type';

export const getLinks = (links: Record<string, ILink[]>, tab: string | null): ILink[] | undefined => {
  if (!tab) return;
  return links[tab];
};
