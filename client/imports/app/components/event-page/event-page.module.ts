import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventPageComponent } from 'client/imports/app/components/event-page/event-page.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [EventPageComponent],
  providers: [EventPageComponent],
  bootstrap: [EventPageComponent]
})
export class EventPageModule { }
