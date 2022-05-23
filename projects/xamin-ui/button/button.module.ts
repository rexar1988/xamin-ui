import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteButtonComponent } from './components/favorite-button/favorite-button.component';
import { ToggleButtonComponent } from './components/toggle-button/toggle-button.component';

@NgModule({
  declarations: [
    FavoriteButtonComponent,
    ToggleButtonComponent,
  ],
  imports: [CommonModule],
  exports: [
    FavoriteButtonComponent,
    ToggleButtonComponent,
  ],
})
export class ButtonModule { }
