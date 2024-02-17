import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { Calendar, CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cal',
  templateUrl: './cal.component.html',
  styleUrls: ['./cal.component.css']
})
export class CalComponent implements OnInit, AfterViewInit {
  calendar!: Calendar;
  holidayTitle: string = '';
  holidayDate: string = '';
  holidayEndDate: string = '';
  numberOfDays: number = 0;

  constructor(private e1: ElementRef, private http: HttpClient) {}

  ngAfterViewInit() {
    this.initializeCalendar();
  }

  ngOnInit(): void {
    this.initializeCalendar();
  }

  initializeCalendar() {
    const calendarE1: HTMLElement = this.e1.nativeElement.querySelector('#calendar');
    this.http.get<any[]>('http://localhost:5000/holidays').subscribe((holidays: any[]) => {
      const holidayEvents = holidays.map((holiday: any) => ({
        title: holiday.title,
        start: holiday.startDate,
        end: holiday.endDate,
      }));

      const calendarOptions: CalendarOptions = {
        plugins: [interactionPlugin, dayGridPlugin],
        initialView: 'dayGridMonth',
        editable: true,
        selectable: true,
        events: holidayEvents,
      };

      this.calendar = new Calendar(calendarE1, calendarOptions);
      this.calendar.render();
      calendarE1.style.height = '500px';
      calendarE1.style.padding = 'auto';
    });
  }

  get calendarEl(): HTMLElement {
    return this.e1.nativeElement.querySelector('#calendar');
  }

  updateNumberOfDays() {
    if (this.holidayDate && this.holidayEndDate) {
      const startDate = new Date(this.holidayDate);
      const endDate = new Date(this.holidayEndDate);
      const timeDifference = endDate.getTime() - startDate.getTime();
      this.numberOfDays = Math.ceil(timeDifference / (1000 * 3600 * 24));
    } else {
      this.numberOfDays = 0;
    }
  }

  addHoliday() {
    const newHoliday = {
      title: this.holidayTitle,
      startDate: this.holidayDate,
      endDate: this.holidayEndDate,
      numberOfDays: this.numberOfDays,
    };

    this.http.post('http://localhost:5000/holidays', newHoliday).subscribe(
      (addedHoliday: any) => {
        if (addedHoliday && addedHoliday.title && addedHoliday.startDate && addedHoliday.endDate) {
          this.calendar.addEvent({
            title: addedHoliday.title,
            start: addedHoliday.startDate,
            end: addedHoliday.endDate,
          });

          // Clearing the fields after adding
          this.holidayTitle = '';
          this.holidayDate = '';
          this.holidayEndDate = '';
          this.numberOfDays = 0;
        } else {
          console.error('Invalid response format from the server');
        }
      },
      (error) => {
        console.error('Error adding holiday:', error);
      }
    );
  }
}
