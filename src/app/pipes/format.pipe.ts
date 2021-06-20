import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'formatToDate'
})
export class FormatToDatePipe implements PipeTransform {
    transform(value: string, args?: any): string {
        return value ? new Date(value).toLocaleString("ru", {
            year: '2-digit',
            month: '2-digit',
            day: '2-digit',
            timeZone: 'UTC',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        }) : "";
    }
}