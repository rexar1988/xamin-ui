import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

import { expandCollapseAnimation } from '../../animations/expand-collapse-animation';
import { hideShowAnimation } from '../../animations/hide-show.animation';
import { IsMenuEvent, MultiMenu } from '../../domain';

@Component({
  selector: 'x-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss'],
  animations: [expandCollapseAnimation, hideShowAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MenuListComponent {
  @Input() items: MultiMenu[] = [];
  @Input() transitionOptions = '400ms cubic-bezier(0.86, 0, 0.07, 1)';
  @Input() nestingLevel = 0;

  onChangeSubMenuStatus(menuIndex: number): void {
    const menuItem: MultiMenu = this.items[menuIndex];

    if (!menuItem.disabled && menuItem.displayType !== 'hover') {
      menuItem.open = !menuItem.open;
    }

    if (!menuItem.multi) {
      this.hideAnotherItems(menuIndex);
    }
  }

  onClickOutside(event: IsMenuEvent, menuIndex: number) {
    const menuItem = this.items[menuIndex];

    if (!menuItem.disabled && !event.isSubMenu && menuItem.displayType === 'click') {
      menuItem.open = false;
    }
  }

  onMouseover(menuIndex: number) {
    const menuItem: MultiMenu = this.items[menuIndex];

    if (!menuItem.disabled && menuItem.displayType === 'hover') {
      menuItem.open = !menuItem.open;

      this.hideAnotherItems(menuIndex);
    }
  }

  onMouseout(menuIndex: number) {
    const menuItem: MultiMenu = this.items[menuIndex];

    if (!menuItem.disabled && menuItem.displayType === 'hover') {
      menuItem.open = false;
    }
  }

  private hideAnotherItems(menuIndex: number): void {
    const hideItem = (menuItem: MultiMenu) => {
      if (!menuItem.disabled) {
        menuItem.open = false;
      }

      menuItem.children?.forEach((item: MultiMenu) => {
        if (!item.disabled && item.displayType === 'click' && item.children?.length) {
          hideItem(item);
        }
      });
    };

    this.items.forEach((item: MultiMenu, index: number) => {
      if (index !== menuIndex) {
        hideItem(item);
      }
    });
  }
}
