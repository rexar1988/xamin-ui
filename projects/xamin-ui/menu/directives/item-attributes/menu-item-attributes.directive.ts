import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { MenuItemAttributes } from '../../domain';

@Directive({
  selector: '[menuItemAttributes]',
})
export class MenuItemAttributesDirective implements OnInit {
  @Input() menuItemAttributes?: MenuItemAttributes = {} as MenuItemAttributes;
  attributeNames = ['id', 'tabindex', 'target', 'title'];

  constructor(
    private readonly elementRef: ElementRef,
    private readonly renderer2: Renderer2,
  ) {}

  ngOnInit(): void {
    if (this.menuItemAttributes) {
      for (const attr of this.attributeNames) {
        const castAttr = attr as keyof MenuItemAttributes;

        if (this.menuItemAttributes[castAttr]) {
          this.renderer2.setAttribute(this.elementRef.nativeElement, attr, this.menuItemAttributes[castAttr] as string);
        }
      }
    }
  }
}
