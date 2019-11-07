import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { TodoAddComponent } from './todo-add/todo-add.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginPageComponent } from 'client/imports/app/components/login-page/login-page.component';
import { LoginPageModule } from 'client/imports/app/components/login-page/login-page.module';
import { EventPageModule } from 'client/imports/app/components/event-page/event-page.module';
import { CalendarPageModule } from 'client/imports/app/components/calendar-page/calendar-page.module';
import { EventPageComponent } from 'client/imports/app/components/event-page/event-page.component';
import { CalendarPageComponent } from 'client/imports/app/components/calendar-page/calendar-page.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    LoginPageModule,
    EventPageModule,
    CalendarPageModule,
    RouterModule.forRoot([
      {
        path: 'todoList',
        component: TodoListComponent
      },
      {
        path: 'todoAdd',
        component: TodoAddComponent
      },
      {
        path: 'login',
        component: LoginPageComponent
      },
      {
        path: 'event',
        component: EventPageComponent
      },
      {
        path: 'calendar',
        component: CalendarPageComponent
      },
      {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
      },
      {
        path: '**',
        component: PageNotFoundComponent
      }
    ], { useHash: true })
  ],
  declarations: [
    AppComponent,
    TodoAddComponent,
    TodoListComponent,
    PageNotFoundComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
