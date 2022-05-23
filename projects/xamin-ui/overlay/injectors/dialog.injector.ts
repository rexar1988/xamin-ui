import { Injector } from '@angular/core';

export class DialogInjector implements Injector {
  constructor(
    private readonly injector: Injector,
    private readonly dialogTokens: WeakMap<object, unknown>,
  ) {}

  get(token: any, notFoundValue?: any) {
    if (this.dialogTokens.get(token)) {
      return this.dialogTokens.get(token);
    }

    return this.injector.get<unknown>(token, notFoundValue);
  }
}
