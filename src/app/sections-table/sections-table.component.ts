import { Component } from "@angular/core";
import { AdministrationService } from "../services/administration.service";

export interface ISection {
    name: string;
    isApproved: boolean;
    objectId: string;
}

@Component({
    selector: "sections-table-app",
    templateUrl: './sections-table.component.html',
    styleUrls: ['./sections-table.component.less']
})

export class SectionsTableComponent {

    sections: ISection[] = [];
    sectionName: string = "";

    constructor(private administrationService: AdministrationService) {
        this.updateSections();
    }

    addNewSection() {
        this.administrationService.addNewSection(this.sectionName).subscribe(
            () => this.updateSections(),
            e => console.log(e));
    }

    approveSection(objectId: string) {
        this.administrationService.approveSection(objectId).subscribe(
            () => this.updateSections(),
            e => console.log(e));
    }

    updateSections() {
        this.administrationService.getAllSections().subscribe((v: any) => { this.sections = v; });
    }
}
