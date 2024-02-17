import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalComponent } from './cal/cal.component';
import { EventComponent } from './event/event.component';
import { FullCalendarModule } from '@fullcalendar/angular';

import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatDatepickerModule} from '@angular/material/datepicker'
import { MatInputModule } from '@angular/material/input'
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    CalComponent,
    EventComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FullCalendarModule,
   
    BrowserAnimationsModule,
    FormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
