import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appTemplate]',
})
export class TemplateDirective {
  @Input('appTemplate') name!: string;

  constructor(public reference: TemplateRef<unknown>) {}
}
