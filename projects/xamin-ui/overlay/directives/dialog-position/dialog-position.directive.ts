import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { DialogPosition } from '../../domain';

@Directive({
  selector: '[mDialogPosition]'
})
export class DialogPositionDirective {
  @Input() mDialogPosition: DialogPosition | null = null;

  constructor(
    private readonly renderer2: Renderer2,
    private readonly elementRef: ElementRef,
  ) { }

  ngOnInit(): void {
    if (this.mDialogPosition) {
      this.renderer2.addClass(this.elementRef.nativeElement, `dialog--position-${this.mDialogPosition}`);
    }
  }
}
