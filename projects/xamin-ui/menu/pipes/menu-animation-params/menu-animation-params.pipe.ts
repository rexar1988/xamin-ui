import { Pipe, PipeTransform } from '@angular/core';
import { AnimationParams } from '../../domain';

@Pipe({
  name: 'menuAnimationParams',
})
export class MenuAnimationParamsPipe implements PipeTransform {
  transform(value: boolean, ...args: any[]): AnimationParams {
    const [transitionOptions] = args;

    return {
      value: value ? 'show' : 'hide',
      params: {
        transitionOptions: transitionOptions,
      },
    };
  }
}
