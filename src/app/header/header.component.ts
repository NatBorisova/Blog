import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: "header-app",
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.less']
})

export class HeaderComponent { 
}
