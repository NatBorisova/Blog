import { Component } from "@angular/core";
import { ISection, SectionService } from "./sections.service";

@Component({
    selector: "sections-table-app",
    templateUrl: './sections-table.component.html',
    styleUrls: ['./sections-table.component.less']
})

export class SectionsTableComponent {

    sections: ISection[] = [];
    sectionName: string = "";

    constructor(private sectionService: SectionService) {
        this.updateSections();
    }

    addNewSection() {
        this.sectionService.addNewSection(this.sectionName).subscribe(
            () => this.updateSections(),
            e => console.log(e));
    }

    approveSection(objectId: string) {
        this.sectionService.approveSection(objectId).subscribe(
            () => this.updateSections(),
            e => console.log(e));
    }

    updateSections() {
        this.sectionService.getAllSections().subscribe((v: any) => { this.sections = v; });
    }
}
