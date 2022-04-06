import {AggregateVolume} from "./volume/AggregateVolume";
import {Volume} from "./volume/Volume";
import {Segment} from "./Segment";
import {Point} from "../geometry/Point";
import * as assert from "assert";
import {apprxEqual, apprxNotEqual} from "../../geometry";
import {ThroatChamber} from "./ThroatChamber";

export class Horn {
    volumes: Volume[]
    height: number
    throatChamber: ThroatChamber
    speakerVolume: number

    constructor(height: number, volumes: Volume[], throatChamber: ThroatChamber, speakerVolume: number) {
        this.height = height
        this.volumes = volumes
        this.throatChamber = throatChamber
        this.speakerVolume = speakerVolume
    }

    mergeVolumes(precision: number) {
        const angles = this.volumes.map(volume => volume.getAngle())
        let i = 0
        while (i < this.volumes.length - 1) {
            if (apprxEqual(angles[i], angles[i + 1], precision)) {
                let j = i + 1;
                while (j < this.volumes.length - 1) {
                    if (apprxNotEqual(angles[j], angles[j + 1], precision)) {
                        this.mergeVolumesWithBounds(i, j)
                        break
                    }
                    j++
                }
            }
            i++
        }
    }

    private mergeVolumesWithBounds(start: number, end: number) {
        const startVolumes = start == 0 ? [] : this.volumes.slice(0, start)
        const mergedVolume = new AggregateVolume(this.volumes.slice(start, end + 1))
        const endVolumes = end == (this.volumes.length - 1) ? [] : this.volumes.slice(end + 1, this.volumes.length)

        this.volumes = [
            ...startVolumes,
            mergedVolume,
            ...endVolumes
        ]
    }

    private getPath(): Point[] {
        return this.volumes.reduce((acc: Point[], volume: Volume) => acc.concat(volume.getPath()), [])
    }

    getSegments(): Segment[] {
        const segments = this.volumes.map(volume => volume.start)
        segments.push(this.volumes[this.volumes.length - 1].end)
        return segments
    }

    printSegmentsArea() {
        this.getSegments().forEach(segment => segment.printArea(this.height))
    }

    printVolumesLength() {
        this.volumes.forEach(volume => volume.printLength())
    }

    printThroatChamberData() {
        this.throatChamber.printVolume(this.height, this.speakerVolume)
        this.throatChamber.printCrossSectionalArea(this.height)
        if (this.throatChamber.throatAdaptor) {
            this.throatChamber.printAdaptorCrossSectionalArea(this.height)
            this.throatChamber.printAdaptorLength()
        }
    }
}
