import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarPageComponent } from 'client/imports/app/components/calendar-page/calendar-page.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [CalendarPageComponent],
  providers: [CalendarPageComponent],
  bootstrap: [CalendarPageComponent]
})
export class CalendarPageModule { }
