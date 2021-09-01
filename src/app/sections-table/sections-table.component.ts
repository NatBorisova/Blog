import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { ISection } from "../interfaces/ISection";
import { SectionService } from "../services/sections.service";

@Component({
    selector: "sections-table-app",
    templateUrl: "./sections-table.component.html",
    styleUrls: ["./sections-table.component.less"]
})

export class SectionsTableComponent implements OnInit, OnDestroy {

    sections: ISection[] = [];
    sectionName: string = "";
    private _onDestroy: Subject<void> = new Subject<void>();

    constructor(private sectionService: SectionService) { }

    ngOnInit(): void {
        this.updateSections();
    }

    addNewSection(): void {
        this.sectionService.addNewSection(this.sectionName)
            .pipe(takeUntil(this._onDestroy))
            .subscribe(
                () => {this.updateSections(); this.sectionName = "";},
                e => console.log(e));
    }

    approveSection(objectId: string): void {
        this.sectionService.approveSection(objectId)
            .pipe(takeUntil(this._onDestroy))
            .subscribe(
                () => this.updateSections(),
                e => console.log(e));
    }

    updateSections(): void {
        this.sectionService.getAllSections()
            .pipe(takeUntil(this._onDestroy))
            .subscribe((v: ISection[]) => { this.sections = v; });
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
}
