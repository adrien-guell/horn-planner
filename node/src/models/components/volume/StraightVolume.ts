import {Point} from "../../geometry/Point";
import {Volume} from "./Volume";
import {areaOfQuadrilateral, areaOfTriangle, centerOf, dot, normalize, sub} from "../../../geometry";
import {Line} from "../../drawing/Line";
import {Segment} from "../Segment";
const acos = Math.acos


/**
 *
 *  start         end
 *   top
 *    |------------|
 *    |            |
 *    |            |
 *    |----------->|
 *    |            |
 *    |____________|
 *  bottom
 *
 */

export class StraightVolume extends Volume {
    constructor(start: Segment, end: Segment) {
        super(start, end)
    }

    getPath() {
        this.path = [
            centerOf(this.start.top, this.start.bottom),
            centerOf(this.end.top, this.end.bottom)
        ]
    }

    getOutlines(): Line[] {
        const lines: Line[] = []

        lines.push({
            path: [this.start.top, this.end.top],
            style: {style: "#000000", lineDash: [], lineWidth: 3}
        })

        lines.push({
            path: [this.start.bottom, this.end.bottom],
            style: {style: "#000000", lineDash: [], lineWidth: 3}
        })

        return lines;
    }


}
