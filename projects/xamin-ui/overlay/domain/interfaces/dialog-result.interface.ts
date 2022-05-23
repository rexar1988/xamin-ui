import { DialogStatus } from '../enums/dialog-status.enum';

export interface DialogResult<T = unknown> {
  dialogStatus: DialogStatus;
  data?: T;
}
