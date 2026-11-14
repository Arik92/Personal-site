import { Directive, ElementRef } from '@angular/core';
import { TranslatorService } from './translator.service';

@Directive({
    selector: '[rtlDiv]',
    standalone: false
})
export class RTLDivDirective {
  isRTL: boolean;

  setDirection(element, isRTL): void {
    if (isRTL) {
      element.nativeElement.classList.add('rtl');
    } else {
      element.nativeElement.classList.remove('rtl');
    }
  }

  constructor(
    private translator: TranslatorService,
    el: ElementRef
  ) {
      this.isRTL = this.translator.isRTL();
      this.setDirection(el, this.isRTL);
      this.translator.langChange$.subscribe((event) => {
        this.setDirection(el, this.translator.isRTL());
      });
    }
}
