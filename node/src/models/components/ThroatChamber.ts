import {Volume} from "./volume/Volume";
import {Segment} from "./Segment";
import {Point} from "../geometry/Point";
import {areaOfPolygon} from "../../geometry";

export class ThroatChamber {
    driverSegment: Segment
    chamberPolygon: Point[]
    adaptor: Volume

    constructor(driverSegment: Segment, chamberPolygon: Point[], adaptor: Volume) {
        this.driverSegment = driverSegment;
        this.chamberPolygon = chamberPolygon;
        this.adaptor = adaptor;
    }

    getCrossSectionalArea(height: number) {
        return this.driverSegment.getArea(height)
    }

    getVolume(height: number): number {
        return areaOfPolygon(this.chamberPolygon) * height
    }
}
