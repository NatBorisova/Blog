import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "formatToDate"
})
export class FormatToDatePipe implements PipeTransform {
    transform(value: string): string {
        return value ? new Date(value).toLocaleString("ru", {
            year: "numeric",
            month: "long",
            day: "2-digit",
            timeZone: "UTC",
            hour: "numeric",
            minute: "numeric",
        }) : "";
    }
}
