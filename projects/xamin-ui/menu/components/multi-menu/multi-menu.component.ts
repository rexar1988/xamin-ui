import { Component, Input } from '@angular/core';
import { Dictionary, MultiMenu } from '../../domain';

@Component({
  selector: 'x-multi-menu',
  templateUrl: './multi-menu.component.html',
  styleUrls: ['./multi-menu.component.scss']
})
export class MultiMenuComponent {
  @Input() items: MultiMenu[] = [];
  @Input() cssClasses: string | string[] | Dictionary = {};
  @Input() cssStyles: Dictionary = {};
  @Input() transitionOptions = '400ms cubic-bezier(0.86, 0, 0.07, 1)';
}
