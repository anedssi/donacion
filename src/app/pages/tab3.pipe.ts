import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tab3'
})
export class Tab3Pipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
