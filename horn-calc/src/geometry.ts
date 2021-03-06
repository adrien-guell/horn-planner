import {Point} from "./models/geometry/Point";
import {Segment} from "./models/components/Segment";
const sqrt = Math.sqrt;
const pow = Math.pow;
const sin = Math.sin;
const abs = Math.abs;

export function radiansToDegrees(radians: number) {
    return radians * (180 / Math.PI);
}

export function centerOf(pointA: Point, pointB: Point): Point {
    return {
        x: (pointA.x + pointB.x) / 2,
        y: (pointA.y + pointB.y) / 2
    }
}

export function apprxEqual(a: number, b: number, precision: number) {
    return abs(a - b) <= precision
}

export function apprxNotEqual(a: number, b: number, precision: number) {
    return abs(a - b) > precision
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

export function getHeightPointOfTriangle(a: Point, b: Point, c: Point) {
    if (c.x - a.x == 0)
        return {x: a.x, y: b.y}

    else {
        // d1 = a1*x + b1
        const a1 = ((c.y - a.y) / (c.x - a.x));
        if (a1 == 0)
            return {x: b.x, y: a.y}

        else {
            const b1 = a.y - a1 * a.x;

            // d2 = a2*x + b2
            const a2 = -1 / a1;
            const b2 = b.y - a2 * b.x;

            // crossing of d1 and d2
            const centerX = (b2 - b1) / (a1 - a2);
            const centerY = a1 * centerX + b1;
            return {x: centerX, y: centerY};
        }
    }
}

export function areaOfPolygon(points: Point[]): number {
    if (points.length <= 2)
        throw `Cannot compute the area of a polygon of ${points.length} point(s)`
    if (points.length == 3)
        return areaOfTriangle(points[0], points[1], points[2])
    if (points.length == 4)
        return areaOfQuadrilateral(points[0], points[1], points[2], points[3])
    if (points.length == 5)
        return areaOfPolygon([centerOf(points[0], points[1]), points[0], points[3], points[4]])
            + areaOfPolygon([centerOf(points[0], points[1]), points[1], points[2], points[3]])
    if (points.length > 5) {
        return areaOfPolygon(points.slice(0, (points.length / 2) + 1))
            + areaOfPolygon([...points.slice((points.length / 2), points.length), points[0]])
    }
    else
        throw "Area of polygon must have a length"
}

export function areaOfQuadrilateral(a: Point, b: Point, c: Point, d: Point): number {
    const center = centerOf(a, c);
    return areaOfTriangle(a, center, b)
        + areaOfTriangle(b, center, c)
        + areaOfTriangle(c, center, d)
        + areaOfTriangle(d, center, a);
}

export function areaOfTriangle(a: Point, b: Point, c: Point): number {
    const h = getHeightPointOfTriangle(a, b, c)
    return areaOfRightTriangle(a, h, b) + areaOfRightTriangle(b, h, c);
}

/* With ac = hypotenuse */
export function areaOfRightTriangle(a: Point, b: Point, c: Point): number {
    return (normalize(a, b) * normalize(b, c)) / 2;
}
