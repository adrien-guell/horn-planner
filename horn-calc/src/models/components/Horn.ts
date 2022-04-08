import {AggregateSection} from "./section/AggregateSection";
import {Section} from "./section/Section";
import {Segment} from "./Segment";
import {Point} from "../geometry/Point";
import * as assert from "assert";
import {apprxEqual, apprxNotEqual} from "../../geometry";
import {ThroatChamber} from "./ThroatChamber";

export class Horn {
    sections: Section[]
    height: number
    throatChamber: ThroatChamber

    constructor(height: number, sections: Section[], throatChamber: ThroatChamber) {
        this.height = height
        this.sections = sections
        this.throatChamber = throatChamber
    }

    mergeSections(precision: number) {
        const angles = this.sections.map(section => section.getAngle())
        let i = 0
        while (i < this.sections.length - 1) {
            if (apprxEqual(angles[i], angles[i + 1], precision)) {
                let j = i + 1;
                while (j < this.sections.length - 1) {
                    if (apprxNotEqual(angles[j], angles[j + 1], precision)) {
                        this.mergeSectionsWithBounds(i, j)
                        break
                    }
                    j++
                }
            }
            i++
        }
    }

    private mergeSectionsWithBounds(start: number, end: number) {
        const startSections = start == 0 ? [] : this.sections.slice(0, start)
        const mergedSection = new AggregateSection(this.sections.slice(start, end + 1))
        const endSections = end == (this.sections.length - 1) ? [] : this.sections.slice(end + 1, this.sections.length)

        this.sections = [
            ...startSections,
            mergedSection,
            ...endSections
        ]
    }

    private getPath(): Point[] {
        return this.sections.reduce((acc: Point[], section: Section) => acc.concat(section.getPath()), [])
    }

    getSegments(): Segment[] {
        const segments = this.sections.map(section => section.start)
        segments.push(this.sections[this.sections.length - 1].end)
        return segments
    }

    printSegmentsArea() {
        this.getSegments().forEach(segment => segment.printArea(this.height))
    }

    printSectionsLength() {
        this.sections.forEach(section => section.printLength())
    }

    /**
     * @param speakerVolume in cube mm
     */
    printThroatChamberData(speakerVolume: number) {
        this.throatChamber.printVolume(this.height, speakerVolume)
        this.throatChamber.printCrossSectionalArea(this.height)
        if (this.throatChamber.throatAdaptor) {
            this.throatChamber.printAdaptorCrossSectionalArea(this.height)
            this.throatChamber.printAdaptorLength()
        }
    }
}
