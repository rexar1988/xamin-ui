import { Directive, EventEmitter, HostListener, Output } from '@angular/core';
import { IsMenuEvent } from '../../domain';

@Directive({
  selector: '[xIsSubMenu]'
})
export class IsSubMenuDirective {
  @Output() xIsSubMenu = new EventEmitter<IsMenuEvent>();

  @HostListener('document:click', ['$event'])
  onClick(event: any) {
    const isSubMenu = !!event.target.closest('.multi-menu');

    this.xIsSubMenu.emit({
      event,
      isSubMenu: isSubMenu,
    });
  }
}
