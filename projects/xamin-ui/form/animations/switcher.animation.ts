import { animate, state, style, transition, trigger } from '@angular/animations';

export const switcherAnimation = trigger('onOff', [
  state('on', style({
    right: '0',
  })),
  transition('on <=> off', animate('{{ transitionOptions }}')),
]);
