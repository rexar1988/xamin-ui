import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { switcherAnimation } from '../../animations/switcher.animation';
import { Dictionary } from '../../domain';

@Component({
  selector: 'x-switcher',
  templateUrl: './switcher.component.html',
  styleUrls: ['./switcher.component.scss'],
  animations: [switcherAnimation],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SwitcherComponent),
      multi: true,
    },
  ],
})
export class SwitcherComponent {
  @Input() prefix = '';
  @Input() suffix = '';
  @Input() on = true;
  @Input() transitionOptions = '400ms cubic-bezier(0.86, 0, 0.07, 1)';
  @Input() width = '42px';
  @Input() cssClasses: string | string[] | Dictionary = {};
  @Input() cssStyles: Dictionary = {};
  @Input() disabled = false;
  @Output() changeEvent = new EventEmitter<boolean>();
  private onTouched: (() => void) | null = null;
  private onChange: ((value: boolean) => void) | null = null;
  private isTouched = false;

  toggleStatus(): void {
    this.on = !this.on;

    if (!this.isTouched) {
      this.isTouched = true;

      if (this.onTouched) {
        this.onTouched();
      }
    }

    if (this.onChange) {
      this.onChange(this.on);
      this.changeEvent.next(this.on);
    }
  }

  registerOnChange(onChange: (value: boolean) => void): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: () => void): void {
    this.onTouched = onTouched;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(value: boolean): void {
    if (value) {
      this.on = value;
    }
  }
}
