import {Point} from "../../geometry/Point";
import {Volume} from "./Volume";
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

export class CornerVolume extends Volume {
    centerOfRotation: Point
    corner: Point
    startOfRotation: Point
    endOfRotation: Point

    constructor(start: Segment, end: Segment, corner: Point) {
        super(start, end)
        if (start.bottom != end.bottom)
            throw 'Cannot determinate center of area '
                + name
                + '. Make sure the sections are defined correctly: '
                + `start = ${start}; end = ${end}`

        this.centerOfRotation = start.bottom
        this.corner = corner
        this.startOfRotation = start.top
        this.endOfRotation = end.top
    }

    getPath(numberOfPoints: number = 20) {
        this.path = []
        this.computeBezierPath(1 / numberOfPoints)
    }

    computeBezierPath(step: number) {
        const leftCenter = centerOf(this.centerOfRotation, this.startOfRotation)
        const rightCenter = centerOf(this.corner, this.endOfRotation)
        const bottomCenter = centerOf(this.centerOfRotation, this.endOfRotation)

        const center = centerOf(leftCenter, rightCenter)
        const start = centerOf(center, leftCenter)
        const end = centerOf(center, bottomCenter)

        const bezier = new Bezier(start.x, start.y, center.x, center.y, end.x, end.y)
        this.path.push(leftCenter)
        for (let t = 0; t <= 1; t += step)
            this.path.push(bezier.get(t))
        this.path.push(bottomCenter)
    }

    getOutlines(): Line[] {
        const lines: Line[] = []

        lines.push({
            path: [this.startOfRotation, this.corner, this.endOfRotation],
            style: {style: "#000000", lineDash: [], lineWidth: 3}
        })

        lines.push({
            path: [centerOf(this.centerOfRotation, this.startOfRotation), centerOf(this.endOfRotation, this.corner)],
            style: {style: "#000000", lineDash: [2, 5], lineWidth: 1}
        })

        lines.push({
            path: [centerOf(this.centerOfRotation, this.endOfRotation), centerOf(this.startOfRotation, this.corner)],
            style: {style: "#000000", lineDash: [2, 5], lineWidth: 1}
        })

        return lines;
    }

    /*getEllipsisPath(numberOfPoints: number): Point[] {
        let teta = atan(height / (width * 2))
        const tetaMax = atan((height * 2) / width)
        const tetaStep = (tetaMax - teta) / numberOfPoints

        const path = []

        while (teta <= tetaMax) {
            path.push(this.getEllipsisPoint(teta))
            teta += tetaStep
        }

        return path
    }

    getEllipsisPoint(teta: number): Point {
        const a = tan(teta)
        const b = width * a - height

        const first = -(a * b)
        const second = height * sqrt(((height ** 2 - b ** 2) / width ** 2) + a ** 2)
        const third = ((height ** 2 / width ** 2) + a ** 2)

        const x1 = (first - second) / third
        const point1 = {
            x: x1,
            y: a * x1 + b
        }

        const x2 = (first + second) / third
        const point2 = {
            x: x2,
            y: a * x2 + b
        }

        const center = {
            x: -width,
            y: -height
        }

        if (normalize(point1, center) > normalize(point2, center))
            return div(add(point1, {x: width, y: height}), 2)
        return div(add(point2, {x: width, y: height}), 2)
    }*/
}
