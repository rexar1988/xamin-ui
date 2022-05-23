import {
  ApplicationRef, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Inject, Injectable, Injector, Renderer2,
  RendererFactory2, TemplateRef, Type,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { take } from 'rxjs/operators';

import { DialogComponent } from '../../components/dialog/dialog.component';
import { DialogInjector } from '../../injectors/dialog.injector';
import { DialogConfig, DialogRef } from '../../domain';

@Injectable()
export class DialogService {
  private renderer: Renderer2 = this.rendererFactory.createRenderer(null, null);

  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    // todo: deprecated
    private readonly componentFactoryResolver: ComponentFactoryResolver,
    private readonly applicationRef: ApplicationRef,
    private readonly injector: Injector,
    private readonly rendererFactory: RendererFactory2,
  ) { }

  open(dialogContent: Type<any> | TemplateRef<any>, dialogConfig?: DialogConfig): DialogRef {
    return this.attachDialogComponentToBody(dialogContent, dialogConfig);
  }

  private attachDialogComponentToBody(dialogContent: Type<any> | TemplateRef<any>, dialogConfig?: DialogConfig): DialogRef {
    const dialogRef = new DialogRef();
    const dialogInjector = new WeakMap<object, unknown>([
      [DialogConfig, dialogConfig?.data ?? {}],
      [DialogRef, dialogRef],
    ]);

    const componentRef: ComponentRef<DialogComponent> = this.componentFactoryResolver
      .resolveComponentFactory<DialogComponent>(DialogComponent)
      .create(new DialogInjector(this.injector, dialogInjector));

    componentRef.instance.contentComponent = dialogContent;

    DialogService.passSettings(componentRef, dialogConfig);

    this.applicationRef.attachView(componentRef.hostView);

    const $componentView = (componentRef.hostView as EmbeddedViewRef<DialogComponent>).rootNodes[0] as HTMLElement;
    this.renderer.appendChild(this.document.body, $componentView);

    dialogRef.afterOpened
      .pipe(take(1))
      .subscribe();

    dialogRef.afterDialogOpened();

    dialogRef.afterClosed
      .pipe(take(1))
      .subscribe(() => this.detachDialogComponentFromBody(componentRef));

    return dialogRef;
  }

  private detachDialogComponentFromBody(componentRef: ComponentRef<DialogComponent>): void {
    this.applicationRef.detachView(componentRef.hostView);
    componentRef.destroy();
  }

  private static passSettings(componentRef: ComponentRef<DialogComponent>, dialogConfig?: DialogConfig): void {
    if (dialogConfig) {
      const settings = { ...dialogConfig };
      delete settings.data;

      componentRef.instance.dialogConfig = settings;
    }
  }
}
