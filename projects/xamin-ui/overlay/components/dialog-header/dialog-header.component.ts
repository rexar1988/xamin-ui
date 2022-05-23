import { Component, Input } from '@angular/core';
import { DialogRef, DialogResult, DialogStatus } from '../../domain';

@Component({
  selector: 'x-dialog-header',
  templateUrl: './dialog-header.component.html',
  styleUrls: ['./dialog-header.component.scss'],
})
export class DialogHeaderComponent {
  @Input() title?: string;

  constructor(
    private readonly dialogRef: DialogRef,
  ) {}

  closeDialog(dialogStatus: DialogStatus = DialogStatus.Cancel): void {
    const result: DialogResult = { dialogStatus: dialogStatus }

    this.dialogRef.closeDialog(result);
  }
}
