import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DialogComponent } from './components/dialog/dialog.component';
import { DialogHeaderComponent } from './components/dialog-header/dialog-header.component';
import { DialogFooterComponent } from './components/dialog-footer/dialog-footer.component';
import { TemplateDirective } from './directives/template/template.directive';
import { AnimateDialogDirective } from './directives/animate-dialog/animate-dialog.directive';
import { DialogPositionDirective } from './directives/dialog-position/dialog-position.directive';
import { DialogService } from './services/dialog/dialog.service';

@NgModule({
  declarations: [
    DialogComponent,
    TemplateDirective,
    DialogHeaderComponent,
    DialogFooterComponent,
    AnimateDialogDirective,
    DialogPositionDirective,
  ],
  imports: [
    CommonModule
  ],
  providers: [
    DialogService,
  ],
})
export class OverlayModule { }
