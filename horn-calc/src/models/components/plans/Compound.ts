import {Plan} from "./Plan";
import {Horn} from "../Horn";
import {Driver} from "../Driver";

export class Compound implements Plan {
    rearHorn: Horn
    frontHorn: Horn
    driver: Driver

    constructor(rearHorn: Horn, frontHorn: Horn, driver: Driver) {
        if (rearHorn.sections.length > 1) throw "Rear horn cannot have more than one section"
        if (rearHorn.throatChamber.throatAdaptor) throw "Rear chamber cannot have a throat adaptor"

        this.rearHorn = rearHorn
        this.frontHorn = frontHorn
        this.driver = driver
    }

    printInfo(): void {
        this.frontHorn.mergeSections(0.5)
        this.frontHorn.printSegmentsArea()
        this.frontHorn.printSectionsLength()
        this.frontHorn.printThroatChamberData(this.driver.getDriverDisplacement())

        this.rearHorn.mergeSections(0.5)
        this.rearHorn.printSegmentsArea()
        this.rearHorn.printSectionsLength()
        this.rearHorn.printThroatChamberData(this.driver.getDriverDisplacement())
    }
}
