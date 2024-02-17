import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Fix the typo here
})
export class AppComponent {
  calendarOptions:any =  {
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this),
    events: [
      { title: 'event 1', date: '2019-04-01', color: '#0000FF' },
      { title: 'event 2', date: '2019-04-02', color: '#0000FF' },
      { title: 'event 3', date: '2019-04-02', color: '#0000FF' }
    ]
  };

  handleDateClick(arg: any) {
    alert('date click! ' + arg.dateStr);
  }
}
