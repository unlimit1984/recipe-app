import { Injectable } from '@angular/core';

// Option 1
// @Injectable({providedIn: 'root'})
export class LoggingService {

  lastlog: string;

  printLog(message: string) {
    console.log('message', message);
    console.log('Previous log', this.lastlog);
    this.lastlog = message;
  }
}
