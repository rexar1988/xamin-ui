import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ToggleButtonComponent } from '../toggle-button/toggle-button.component';

@Component({
  selector: 'x-favorite-button',
  templateUrl: './favorite-button.component.html',
  styleUrls: ['./favorite-button.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FavoriteButtonComponent),
      multi: true,
    },
  ],
})
export class FavoriteButtonComponent extends ToggleButtonComponent {
  @Input() label = '';

  constructor() {
    super();
  }
}
