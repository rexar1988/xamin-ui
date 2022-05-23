import { Observable, Subject } from 'rxjs';
import { DialogResult } from '../interfaces/dialog-result.interface';

export class DialogRef {
  private readonly _afterClosed$ = new Subject<unknown>();
  private readonly _afterOpened$ = new Subject<unknown>();
  afterClosed: Observable<unknown> = this._afterClosed$.asObservable();
  afterOpened: Observable<unknown> = this._afterOpened$.asObservable();

  afterDialogOpened(): void {
    this._afterOpened$.next(null);
  }

  closeDialog(result?: unknown | DialogResult): void {
    this._afterClosed$.next(result);
  }
}
