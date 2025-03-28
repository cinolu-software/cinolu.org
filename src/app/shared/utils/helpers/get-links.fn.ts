import { ILink } from 'app/shared/layout/utils/types/link.type';

export const getLinks = (links: Record<string, ILink[]>, tab: string): ILink[] => links[tab];
