import {Point} from "./models/Point";
const sqrt = Math.sqrt;
const pow = Math.pow;
const sin = Math.sin;

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

export function sub(pointA: Point, pointB: Point): Point {
    return {
        x: pointA.x - pointB.x,
        y: pointA.y - pointB.y
    }
}

export function dot(pointA: Point, pointB: Point): number {
    return  pointA.x * pointB.x + pointA.y * pointB.y
}

export function div(pointA: Point, div: number): Point {
    return {
        x: pointA.x / div,
        y: pointA.y / div
    }
}

export function areaOfPolygon(points: Point[]): number {

}

export function areaOfTriangle(a: number, b: number, angle: number): number {
    return 0.5 * a * b * sin(angle)
}

export function areaOfRightTriangle(width: number, height: number) {
    return (width * height) / 2
}
