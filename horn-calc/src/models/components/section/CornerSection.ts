import {Point} from "../../geometry/Point";
import {Section} from "./Section";
import {Bezier} from "bezier-js";
import {areaOfQuadrilateral, areaOfTriangle, centerOf, dot, getCommonPoint, normalize, sub} from "../../../geometry";
import {Line} from "../../drawing/Line";
import {Segment} from "../Segment";

const acos = Math.acos

/**
 *
 * start         corner
 *   |------------|
 *   |            |
 *   |            |
 *   |>--__       |
 *   |     \      |
 *   |_____|______|
 * center        end
 *
 */

export class CornerSection extends Section {
    centerOfRotation: Point
    corner: Point
    startOfRotation: Point
    endOfRotation: Point

    constructor(start: Segment, end: Segment, corner: Point) {
        super(start, end)
        if (start.bottom != end.bottom)
            throw 'Cannot determinate center of the section '
            + name
            + '. Make sure the sections are defined correctly: '
            + `start = ${start}; end = ${end}`

        this.centerOfRotation = start.bottom
        this.corner = corner
        this.startOfRotation = start.top
        this.endOfRotation = end.top
    }

    getPath(numberOfPoints: number = 20): Point[] {
        return this.computeBezierPath(1 / numberOfPoints)
    }

    getOutlines(): Line[] {
        return [{
            path: [this.endOfRotation, this.corner, this.startOfRotation],
            style: {style: "#000000", lineDash: [], lineWidth: 3}
        }]
    }

    private computeBezierPath(step: number): Point[] {
        const leftCenter = centerOf(this.centerOfRotation, this.startOfRotation)
        const rightCenter = centerOf(this.corner, this.endOfRotation)
        const bottomCenter = centerOf(this.centerOfRotation, this.endOfRotation)

        const center = centerOf(leftCenter, rightCenter)
        const start = centerOf(center, leftCenter)
        const end = centerOf(center, bottomCenter)

        const bezier = new Bezier(start.x, start.y, center.x, center.y, end.x, end.y)

        const path = []
        path.push(leftCenter)
        for (let t = 0; t <= 1; t += step)
            path.push(bezier.get(t))
        path.push(bottomCenter)
        return path
    }
}
