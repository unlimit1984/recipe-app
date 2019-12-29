import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
// export class DropdownDirective implements OnInit {
// My solution
// @Input() isOpened: boolean = false;
//
// constructor(private elementRef: ElementRef, private renderer: Renderer2) {
// }
//
// ngOnInit(): void {
//   this.handleOpening();
// }
//
// @HostListener('click') mouseClick(eventData: Event) {
//   this.isOpened = !this.isOpened;
//   this.handleOpening();
// }
//
// handleOpening() {
//   if (this.isOpened) {
//     this.renderer.addClass(this.elementRef.nativeElement, 'open');
//   } else {
//     this.renderer.removeClass(this.elementRef.nativeElement, 'open');
//   }
// }

// Author's solution
export class DropdownDirective {
  @HostBinding('class.open') isOpened = false;

  @HostListener('click') toggleOpen() {
    this.isOpened = !this.isOpened;
  }
}
