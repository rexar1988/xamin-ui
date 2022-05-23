import { Params, QueryParamsHandling } from '@angular/router';
import { Dictionary, MenuItemAttributes } from '../index';

export interface Menu {
  action?: {
    command?: (event: MouseEvent) => void;
    url?: string;
    queryParams?: Params;
    routerLink?: string;
    routerLinkActiveOptions?: string[] | string;
    queryParamsHandling?: QueryParamsHandling;
  };
  cssStyles?: Dictionary;
  cssClasses?: string | string[];
  disabled?: boolean;
  hidden?: boolean;
  label: string;
  itemAttributes?: MenuItemAttributes;
  icon?: string;
}
