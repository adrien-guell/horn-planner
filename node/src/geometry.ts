import {Point} from "./models/geometry/Point";
import {Segment} from "./models/components/Segment";
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

export function getCommonPoint(a: Segment, b: Segment): Point {
    if (a.top == b.top || a.top == b.bottom)
        return a.top
    return a.bottom
}

export function areaOfQuadrilateral(a: Point, b: Point, c: Point, d: Point): number {
    const center = centerOf(a, c);
    return areaOfTriangle(a, center, b)
        + areaOfTriangle(b, center, c)
        + areaOfTriangle(c, center, d)
        + areaOfTriangle(d, center, a);
}

/* With ac = hypotenuse */
export function areaOfTriangle(a: Point, b: Point, c: Point): number {
    let center: Point

    if (c.x - a.x == 0) {
        center = {x: a.x, y: b.y}
    } else {
        // d1 = a1*x + b1
        const a1 = ((c.y - a.y) / (c.x - a.x));
        if (a1 == 0) {
            center = {x: b.x, y: a.y}
        } else {
            const b1 = a.y - a1 * a.x;

            // d2 = a2*x + b2
            const a2 = -1 / a1;
            const b2 = b.y - a2 * b.x;

            // crossing of d1 and d2
            const centerX = (b2 - b1) / (a1 - a2);
            const centerY = a1 * centerX + b1;
            center = {x: centerX, y: centerY};
        }
    }

    return areaOfRightTriangle(a, center, b) + areaOfRightTriangle(b, center, c);
}

/* With ac = hypotenuse */
export function areaOfRightTriangle(a: Point, b: Point, c: Point): number {
    return (normalize(a, b) * normalize(b, c)) / 2;
}
