import { AfterViewInit, Component, HostListener, OnInit, QueryList, TemplateRef, Type,
  ViewChildren } from '@angular/core';

import { TemplateDirective } from '../../directives/template/template.directive';
import { DialogConfig, DialogRef, DialogResult } from '../../domain';

@Component({
  selector: 'x-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit, AfterViewInit {
  @ViewChildren(TemplateDirective) templates!: QueryList<TemplateDirective>;
  dialogConfig: Omit<DialogConfig, 'data'> = {};
  contentComponent!: Type<any> | TemplateRef<any>;

  constructor(
    private readonly dialogRef: DialogRef,
  ) {}

  @HostListener('body:keydown', ['$event'])
  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.dialogRef.closeDialog();
    }
  }

  ngOnInit(): void {
    this.setDefaultSettings();
  }

  ngAfterViewInit(): void {
    this.renderCustomHeader();
    this.renderContent();
    this.renderCustomFooter();
  }

  onClose(): void {
    this.dialogRef.closeDialog();
  }

  onDialog(event: MouseEvent): void {
    const $target = event.target as HTMLElement;

    if ($target.classList.contains('dialog') && this.dialogConfig.showOverlay) {
      this.onClose();
    }
  }

  private setDefaultSettings(): void {
    if (this.dialogConfig.closeOnEscape === false) {
      this.dialogConfig.closeOnEscape = true;
    }

    if (this.dialogConfig.showOverlay === undefined) {
      this.dialogConfig.showOverlay = true;
    }
  }

  private renderContent(): void {
    const container: TemplateDirective = this.templates.find(item => item.mTemplate === 'contentContainer')!;

    if (this.contentComponent instanceof TemplateRef) {
      const context = {
        $implicit: {
          close: (result?: unknown | DialogResult): void => {
            this.dialogRef.closeDialog(result);
          }
        },
      };

      container.viewContainerRef.createEmbeddedView(this.contentComponent, context);
    } else {
      container.viewContainerRef.createComponent(this.contentComponent);
    }
  }

  private renderCustomHeader(): void {
    if (this.dialogConfig.headerComponent) {
      const footerContainer: TemplateDirective = this.templates.find(item => item.mTemplate === 'headerContainer')!;

      footerContainer.viewContainerRef.createComponent(this.dialogConfig.headerComponent);
    }
  }

  private renderCustomFooter(): void {
    if (this.dialogConfig.footerComponent) {
      const footerContainer: TemplateDirective = this.templates.find(item => item.mTemplate === 'footerContainer')!;

      footerContainer.viewContainerRef.createComponent(this.dialogConfig.footerComponent);
    }
  }
}
