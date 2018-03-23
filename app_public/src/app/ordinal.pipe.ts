import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ordinal'
})
export class OrdinalPipe implements PipeTransform {

  transform(finish: any): string {
    const _isNumeric = function (n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    };

    var s = ["th","st","nd","rd"];
    

    if (finish) {
      if (finish && _isNumeric(finish)) {
        var v = finish%100;
        if (finish === 1) {
          return finish+(s[(v-20)%10]||s[v]||s[0]);
        } else if (finish === 2) {
          return finish+(s[(v-20)%10]||s[v]||s[0]);
        } else if (finish === 3) {
          return finish+(s[(v-20)%10]||s[v]||s[0]);
        } else {
          return finish+(s[(v-20)%10]||s[v]||s[0]);
        }
      } else {
        return finish;
      }
    } else {
      return '-';
    }
  }

}
