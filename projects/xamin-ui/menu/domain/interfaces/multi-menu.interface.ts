import { Menu } from './menu.interface';
import { ToggleArea } from '../types/toggle-area.type';
import { MenuDisplay } from '../types/menu-display.type';

export interface MultiMenu extends Menu {
  open?: boolean;
  toggleArea?: ToggleArea;
  showStatusIcon?: boolean;
  displayType?: MenuDisplay;
  multi?: boolean;
  children?: MultiMenu[];
}
