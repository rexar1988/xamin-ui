import { Pipe, PipeTransform } from '@angular/core';
import { AnimationParams } from '../../domain';

@Pipe({
  name: 'toggleAnimationParams',
})
export class ToggleAnimationParamsPipe implements PipeTransform {
  transform(value: boolean, ...args: any[]): AnimationParams {
    const [transitionOptions] = args;

    return {
      value: value ? 'on' : 'off',
      params: { transitionOptions },
    };
  }
}
