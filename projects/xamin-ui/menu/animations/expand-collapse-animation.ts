import { animate, state, style, transition, trigger } from '@angular/animations';

export const expandCollapseAnimation = trigger('expandCollapse', [
  state('hide', style({
    height: '0',
    overflow: 'hidden',
  })),
  state('show', style({
    height: '*',
    overflow: 'visible',
  })),
  transition('show <=> hide', animate('{{ transitionOptions }}')),
]);
