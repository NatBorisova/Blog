import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: "page-not-found-app",
  changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './page-not-found.component.html',
    styleUrls: ['./page-not-found.component.less']
})

export class PageNotFoundComponent { }
