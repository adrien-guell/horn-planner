import {AggregateVolume} from "./volume/AggregateVolume";
import {Volume} from "./volume/Volume";
import {Segment} from "./Segment";

export class Horn {
    volumes: Volume[]
    height: number

    constructor(height: number, volumes: Volume[]) {
        this.height = height
        this.volumes = volumes
    }

    mergeVolumes(numberOfSegments: number) {
        this.volumes = [
            ...(this.volumes.slice(0, numberOfSegments - 1)),
            new AggregateVolume(this.volumes.slice(numberOfSegments - 1, this.volumes.length))
        ]
    }

    computePaths() {
        this.volumes.forEach(volume => volume.getPath())
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
}
