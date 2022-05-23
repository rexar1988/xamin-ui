import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { ButtonType, ButtonSize } from '../../domain';

@Directive({
  selector: '[xButton]'
})
export class ButtonDirective implements OnInit {
  @Input() buttonType: ButtonType = 'primary';
  @Input() size: ButtonSize = 'large';

  constructor(
    private readonly elementRef: ElementRef,
    private readonly renderer: Renderer2,
  ) { }

  ngOnInit(): void {
    this.renderer.addClass(this.elementRef.nativeElement, 'btn');
    this.renderer.addClass(this.elementRef.nativeElement, `btn--${this.buttonType}`);
    this.renderer.addClass(this.elementRef.nativeElement, `btn--${this.size}`);
  }
}
