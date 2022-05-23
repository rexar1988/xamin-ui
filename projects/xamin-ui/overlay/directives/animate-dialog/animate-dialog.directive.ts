import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { AnimationName } from '../../domain';

@Directive({
  selector: '[mAnimateDialog]'
})
export class AnimateDialogDirective implements OnInit {
  @Input() mAnimateDialog: AnimationName | null = null;

  constructor(
    private readonly renderer2: Renderer2,
    private readonly elementRef: ElementRef,
  ) { }

  ngOnInit(): void {
    if (this.mAnimateDialog) {
      this.renderer2.addClass(this.elementRef.nativeElement, `animate__${this.mAnimateDialog}`);
    }
  }
}
