import { DialogPosition } from '../types/dialog-position.type';
import { Type } from '@angular/core';

import { AnimationIn } from '../types/animation-in.type';
import { Dictionary } from '../interfaces/dictionary.interface';

export class DialogConfig<D = unknown> {
  data?: D;
  width?: string;
  height?: string;
  animation?: AnimationIn;
  closeOnEscape?: boolean;
  cssClasses?: string | string[] | Dictionary;
  title?: string;
  headerComponent?: Type<any> | false;
  footerComponent?: Type<any> | false;
  position?: DialogPosition;
  rtl?: boolean;
  showOverlay?: boolean;
}
