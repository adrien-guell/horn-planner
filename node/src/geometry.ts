import {Point} from "./models/Point";
import {Rotation} from "./models/Rotation";
const sqrt = Math.sqrt;
const pow = Math.pow;

export function centerOf(pointA: Point, pointB: Point): Point {
    return {
        x: (pointA.x + pointB.x) / 2,
        y: (pointA.y + pointB.y) / 2
    }
}

export function normalize(pointA: Point, pointB: Point): number {
    return sqrt(pow(pointB.x - pointA.x, 2) + pow(pointB.y - pointA.y, 2))
}

export function add(pointA: Point, pointB: Point): Point {
    return {
        x: pointA.x + pointB.x,
        y: pointA.y + pointB.y
    }
}

export function div(pointA: Point, div: number): Point {
    return {
        x: pointA.x / div,
        y: pointA.y / div
    }
}

export function rotate(point: Point, rotation: Rotation): Point {
    if (rotation == 90)
        return {x: point.y, y: -point.x}
    if (rotation == 180)
        return {x: -point.x, y: -point.y}
    if (rotation == 270)
        return {x: -point.y, y: point.x}
    else
        return point
}
