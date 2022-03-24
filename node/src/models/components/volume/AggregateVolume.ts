import {Line} from "../../drawing/Line";
import {Segment} from "../Segment";
import {Volume} from "./Volume";

export class AggregateVolume extends Volume {
    volumes: Volume[]

    constructor(volumes: Volume[]) {
        if (volumes.length < 2)
            throw "Cannot instantiate an aggregate volume with less than two volumes"
        super(volumes[0].start, volumes[volumes.length - 1].end);
        this.volumes = volumes;
    }

    getPath(): void {
        this.volumes.forEach(volume => volume.getPath())
    }

    getOutlines(): Line[] {
        return this.volumes.map(volume => volume.getOutlines()).reduce((a, b) => a.concat(b));
    }
}
