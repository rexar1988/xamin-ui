import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'x-toggle-button',
  templateUrl: './toggle-button.component.html',
  styleUrls: ['./toggle-button.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ToggleButtonComponent),
      multi: true,
    },
  ],
})
export class ToggleButtonComponent implements ControlValueAccessor {
  @Input() disabled = false;
  @Output() changeEvent = new EventEmitter<boolean>();
  isActive = false;
  private _onTouched: (() => void) | null = null;
  private _onChange: ((value: boolean) => void) | null = null;
  private _isTouched = false;

  toggleStatus() {
    if (!this._isTouched) {
      this._isTouched = true;

      if (this._onTouched) {
        this._onTouched();
      }
    }

    this.isActive = !this.isActive;

    if (this._onChange) {
      this._onChange(this.isActive);
      this.changeEvent.next(this.isActive);
    }
  }

  registerOnChange(onChange: (value: boolean) => void): void {
    this._onChange = onChange;
  }

  registerOnTouched(onTouched: () => void): void {
    this._onTouched = onTouched;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(value: boolean): void {
    if (value) {
      this.isActive = value;
    }
  }
}
