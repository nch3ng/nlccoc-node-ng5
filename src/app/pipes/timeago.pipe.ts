import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
  name: 'timeago'
})
export class TimeagoPipe implements PipeTransform {
  transform(value: any) {
    const seconds = Math.trunc((Date.now() - new Date(value).getTime()) / 1000);
    let return_message = '';
    const a_min = 60;
    const a_hour = 60 * 60;
    const a_day = 60 * 60 * 24;
    const a_week = 60 * 60 * 24 * 7;
    const a_month = 60 * 60 * 24 * 30;
    let minutes = 0;
    let hours = 0;
    let days = 0;
    let months = 0;
    if (seconds < 15) {
      return_message = 'A few seconds ago';
    } else if (seconds < a_min) {
      const w = seconds > 1 ? 'seconds ago' : 'second ago';
      return_message = seconds + ' ' + w;
    } else if (seconds >= a_min && seconds < a_hour) {
      minutes = Math.trunc(seconds / a_min);
      const w = minutes > 1 ? 'minutes ago' : 'minute ago';
      return_message = minutes + ' ' + w;
    } else if (seconds >= a_hour && seconds < a_day) {
      hours = Math.trunc(seconds / a_hour);
      const w = hours > 1 ? 'hours ago' : 'hour ago';
      return_message = hours + ' ' + w;
    } else if (seconds >= a_day && seconds < a_month) {
      days = Math.trunc(seconds / a_day);
      const w = days > 1 ? 'days ago' : 'day ago';
      return_message = days + ' ' + w;
    } else if (seconds >= a_month) {
      months = Math.trunc(seconds / a_month);
      const w = months > 1 ? 'months ago' : 'month ago';
      return_message = months + ' ' + w;
    }
    return return_message;
  }
}
