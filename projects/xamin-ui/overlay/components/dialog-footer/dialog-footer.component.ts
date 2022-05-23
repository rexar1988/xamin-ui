import { Component } from '@angular/core';
import { DialogRef, DialogResult, DialogStatus } from '../../domain';

@Component({
  selector: 'x-dialog-footer',
  templateUrl: './dialog-footer.component.html',
  styleUrls: ['./dialog-footer.component.scss'],
})
export class DialogFooterComponent {
  dialogStatusEnum = DialogStatus;

  constructor(
    private readonly dialog: DialogRef,
  ) { }

  closeDialog(dialogStatus: DialogStatus = DialogStatus.Ok): void {
    const result: DialogResult = { dialogStatus };

    this.dialog.closeDialog(result);
  }
}
