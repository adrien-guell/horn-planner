import {Plan} from "./Plan";
import {Horn} from "../Horn";
import {Driver} from "../Driver";

export class FrontLoaded implements Plan {
    horn: Horn
    driver: Driver

    constructor(horn: Horn, driver: Driver) {
        this.horn = horn
        this.driver = driver
    }

    printInfo(): void {
        this.horn.mergeSections(0.5)
        this.horn.printSegmentsArea()
        this.horn.printSectionsLength()
        this.horn.printThroatChamberData(0)
    }
}
