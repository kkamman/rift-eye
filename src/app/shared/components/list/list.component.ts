import {
  AfterContentInit,
  Component,
  ContentChildren,
  Input,
  QueryList,
  TemplateRef,
} from '@angular/core';
import { TemplateDirective } from '../../directives/template.directive';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements AfterContentInit {
  @ContentChildren(TemplateDirective) templates?: QueryList<TemplateDirective>;

  @Input() title = '';
  @Input() listItemData: unknown[] = [];

  templateReferences: Record<string, TemplateRef<unknown>> = {};

  ngAfterContentInit(): void {
    this.templates?.forEach((template) => {
      this.templateReferences[template.name] = template.reference;
    });
  }
}
