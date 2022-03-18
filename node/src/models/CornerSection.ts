import {Point} from "./Point";
import {Section} from "./Section";
import {Rotation} from "./Rotation";
import {Bezier} from "bezier-js";
import {add, centerOf, div, normalize} from "../geometry";
const abs = Math.abs;
const sqrt = Math.sqrt;
const tan = Math.tan;
const atan = Math.atan;

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

export class CornerSection implements Section {
    centerOfRotation: Point
    start: Point
    end: Point
    opposite: Point
    position: Point
    rotation: Rotation
    path: Point[]

    constructor(center: Point, start: Point, end: Point, opposite: Point, position: Point, rotation: Rotation) {
        this.centerOfRotation = center;
        this.start = start;
        this.end = end;
        this.opposite = opposite;
        this.position = position;
        this.rotation = rotation;
        this.path = [];
    }

    strokePath(context: any) {

    }

    computeLength() {
        let sum = 0
        for (let i = 0; i < this.path.length - 1; i++)
            sum += normalize(this.path[i], this.path[i + 1])
        return sum
    }

    computePath() {
        const method = "bezier"
        const numberOfPoints = 20
        const width = abs(this.opposite.x - this.start.x)
        const height = abs(this.start.y - this.centerOfRotation.y)

        this.path = []
        if (method == "bezier")
            this.computeBezierPath(1 / numberOfPoints)
        // else
        //     this.path.concat(getEllipsisPath(width / 2, height / 2, numberOfPoints))
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
