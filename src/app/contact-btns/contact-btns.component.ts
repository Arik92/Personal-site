import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-contact-btns',
    templateUrl: './contact-btns.component.html',
    styleUrls: ['./contact-btns.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class ContactBtnsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
