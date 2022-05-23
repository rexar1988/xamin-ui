import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { MenuListComponent } from './components/menu-list/menu-list.component';
import { MultiMenuComponent } from './components/multi-menu/multi-menu.component';
import { IsSubMenuDirective } from './directives/is-sub-menu/is-sub-menu.directive';
import { MenuItemAttributesDirective } from './directives/item-attributes/menu-item-attributes.directive';
import { MenuAnimationParamsPipe } from './pipes/menu-animation-params/menu-animation-params.pipe';

@NgModule({
  declarations: [
    BreadcrumbsComponent,
    MenuListComponent,
    MultiMenuComponent,
    IsSubMenuDirective,
    MenuAnimationParamsPipe,
    MenuItemAttributesDirective,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    BreadcrumbsComponent,
    MultiMenuComponent,
  ],
})
export class MenuModule { }
