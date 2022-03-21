import {Point} from "./Point";
import {Section} from "./Section";
import {Bezier} from "bezier-js";
import {areaOfTriangle, centerOf, dot, normalize, sub} from "../geometry";
import {Line} from "./Line";
const acos = Math.acos

/**
 *
 * start         opposite
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
    start: Point
    end: Point
    opposite: Point

    constructor(name: string, center: Point, start: Point, end: Point, opposite: Point) {
        super(name)
        this.centerOfRotation = center;
        this.start = start;
        this.end = end;
        this.opposite = opposite;
    }

    computeArea(): number {
        const a1 = normalize(this.start, this.end)
        const b1 = normalize(this.centerOfRotation, this.start)
        const angle1 = acos(dot(
                sub(this.end, this.centerOfRotation),
                sub(this.end, this.start)
            ) / (normalize(this.end, this.centerOfRotation) * normalize(this.end, this.start)))
        const area1 = areaOfTriangle(a1, b1, angle1)

        const a2 = normalize(this.centerOfRotation, this.opposite)
        const b2 = normalize(this.start, this.centerOfRotation)
        const angle2 = acos(dot(
            sub(this.opposite, this.start),
            sub(this.opposite, this.centerOfRotation)
        ) / (normalize(this.opposite, this.start) * normalize(this.opposite, this.centerOfRotation)))
        const area2 = areaOfTriangle(a2, b2, angle2)

        return area1 + area2
    }

    computePath(numberOfPoints: number = 20) {
        this.path = []
        this.computeBezierPath(1 / numberOfPoints)
    }

    computeBezierPath(step: number) {
        const leftCenter = centerOf(this.centerOfRotation, this.start)
        const rightCenter = centerOf(this.opposite, this.end)
        const bottomCenter = centerOf(this.centerOfRotation, this.end)

        const center = centerOf(leftCenter, rightCenter)
        const start = centerOf(center, leftCenter)
        const end = centerOf(center, bottomCenter)

        const bezier = new Bezier(start.x, start.y, center.x, center.y, end.x, end.y)
        this.path.push(leftCenter)
        for (let t = 0; t <= 1; t += step)
            this.path.push(bezier.get(t))
        this.path.push(bottomCenter)
    }

    getLines(): Line[] {
        const lines: Line[] = []
        lines.push({
            path: [this.start, this.centerOfRotation, this.end],
            style: {style: "#000000", lineDash: [5, 15], lineWidth: 2}
        })

        lines.push({
            path: [this.start, this.opposite, this.end],
            style: {style: "#000000", lineDash: [], lineWidth: 3}
        })

        lines.push({
            path: [centerOf(this.centerOfRotation, this.start), centerOf(this.end, this.opposite)],
            style: {style: "#000000", lineDash: [2, 5], lineWidth: 1}
        })

        lines.push({
            path: [centerOf(this.centerOfRotation, this.end), centerOf(this.start, this.opposite)],
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
