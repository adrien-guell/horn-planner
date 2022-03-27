import {normalize} from "../../geometry";
import {Line} from "../drawing/Line";
import {Point} from "../geometry/Point";

export class Segment {
    id: number
    top: Point
    bottom: Point

    /**
     *  The representation of a section in a horn going from left to right.
     *  To find top and bottom, you need to unfold your horn so that the sections
     *  are ordered from left to right.
     *
     * @param id: id of the section
     * @param top: top point of the section
     * @param bottom: bottom point of the section
     */
    constructor(id: number, top: Point, bottom: Point) {
        this.id = id;
        this.top = top;
        this.bottom = bottom;
    }

    getName(): string {
        return `S${this.id}`
    }

    printArea(height: number) {
        const segmentArea = this.getArea(height);
        console.log(`${this.getName()} = ${(segmentArea / 100).toFixed(2)}cm²`);
    }

    getArea(height: number): number {
        return normalize(this.top, this.bottom) * height
    }

    getLine() {
        return {
            path: [this.top, this.bottom],
            style: {style: "#000000", lineDash: [5, 15], lineWidth: 3}
        }
    }
}
