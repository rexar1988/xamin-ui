import { animate, state, style, transition, trigger } from '@angular/animations';

export const hideShowAnimation = trigger('hideShow', [
  state('hide', style({
    opacity: 0,
    visibility: 'hidden',
  })),
  state('show', style({
    opacity: 1,
    visibility: 'visible',
  })),
  transition('show <=> hide', animate('{{ transitionOptions }}')),
]);
