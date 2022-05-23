import { Directive, Input, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[mTemplate]',
})
export class TemplateDirective {
  @Input() mTemplate = '';

  constructor(
    public readonly viewContainerRef: ViewContainerRef,
  ) { }
}
