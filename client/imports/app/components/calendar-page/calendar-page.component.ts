import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'mc-calendar-page',
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CalendarPageComponent implements OnInit {

  date = new Date();

  constructor() { }

  ngOnInit() {
  }

}
