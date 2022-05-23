import { Component, Input } from '@angular/core';
import { Dictionary, Menu } from '../../domain';

@Component({
  selector: 'x-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent {
  @Input() items: Menu[] = [];
  @Input() cssClasses: string | string[] | Dictionary = {};
  @Input() cssStyles: Dictionary = {};
  @Input() homeIcon: string | boolean = '';
  @Input() separator: string | null = null;
}
