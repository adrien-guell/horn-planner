import {Volume} from "./volume/Volume";
import {Segment} from "./Segment";
import {Point} from "../geometry/Point";
import {areaOfPolygon} from "../../geometry";
import {StraightVolume} from "./volume/StraightVolume";
import {Line} from "../drawing/Line";

export class ThroatChamber {
    driverSegment: Segment
    chamberPolygon: Point[]
    throatAdaptor: Volume | null

    constructor(driverSegment: Segment, chamberPolygon: Point[], adaptor: Volume | null = null) {
        this.driverSegment = driverSegment;
        this.chamberPolygon = chamberPolygon;
        this.throatAdaptor = adaptor;
    }

    getPath(): Point[] {
        return this.throatAdaptor?.getPath() ?? []
    }

    getOutlines(): Line[] {
        return [
            this.driverSegment.getLine(),
            ...(this.throatAdaptor?.getOutlines() ?? []),
            {
                path: this.chamberPolygon,
                style: {style: "#000000", lineDash: [], lineWidth: 3}
            }
        ]
    }

    getAdaptorCrossSectionalArea(height: number): number {
        return this.throatAdaptor!.start.getLength() * height
    }

    printAdaptorCrossSectionalArea(height: number) {
        const area = this.getAdaptorCrossSectionalArea(height)
        console.log(`Ap1 = ${(area / 100).toFixed(2)}cm²`)
    }

    getAdaptorLength(): number {
        return this.throatAdaptor!.getLength()
    }

    printAdaptorLength() {
        const length = this.getAdaptorLength()
        console.log(`Lp = ${(length / 10).toFixed(2)}cm`)
    }

    getCrossSectionalArea(height: number): number {
        return this.driverSegment.getLength() * height
    }

    printCrossSectionalArea(height: number) {
        const area = this.getCrossSectionalArea(height)
        console.log(`Atc = ${(area / 100).toFixed(2)}cm²`)
    }

    /**
     *
     * @param height in mm
     * @param speakerVolume in mm
     */
    getVolume(height: number, speakerVolume: number): number {
        return (areaOfPolygon(this.chamberPolygon)) * height - speakerVolume// TODO implement for not polygons with angles > 90
    }

    printVolume(height: number, speakerVolume: number) {
        const volume = this.getVolume(height, speakerVolume)
        console.log(`Vtc = ${(volume / 1000).toFixed(2)}cm³`)
    }
}
