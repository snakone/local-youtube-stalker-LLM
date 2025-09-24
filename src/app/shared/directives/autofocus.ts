import { Directive, ElementRef } from '@angular/core';

@Directive({selector: '[llamaFocus]'})

export class Autofocus {

  constructor(private el: ElementRef<HTMLInputElement>) { }

  ngAfterViewInit(): void {
    if (this.el.nativeElement) {
      this.el.nativeElement.focus();
    }
  }

}
