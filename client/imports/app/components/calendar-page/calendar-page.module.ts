import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarPageComponent } from 'client/imports/app/components/calendar-page/calendar-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ],
  declarations: [CalendarPageComponent],
  providers: [CalendarPageComponent],
  bootstrap: [CalendarPageComponent]
})
export class CalendarPageModule { }
