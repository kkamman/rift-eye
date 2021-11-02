import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './components/list/list.component';
import { TemplateDirective } from './directives/template.directive';

@NgModule({
  declarations: [ListComponent, TemplateDirective],
  imports: [CommonModule],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    ListComponent,
    TemplateDirective,
  ],
})
export class SharedModule {}
