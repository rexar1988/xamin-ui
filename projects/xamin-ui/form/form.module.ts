import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SwitcherComponent } from './components/switcher/switcher.component';
import { ToggleAnimationParamsPipe } from './pipes/animation-params/toggle-animation-params.pipe';

@NgModule({
  declarations: [
    SwitcherComponent,
    ToggleAnimationParamsPipe
  ],
  imports: [
    CommonModule
  ]
})
export class FormModule { }
