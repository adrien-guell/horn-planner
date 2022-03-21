import {Point} from "./Point";
import {Section} from "./Section";
import {areaOfTriangle, centerOf, dot, normalize, sub} from "../geometry";
import {Line} from "./Line";
const acos = Math.acos


/**
 *
 * startSrc         endSrc
 *    |------------|
 *    |            |
 *    |            |
 *    |----------->|
 *    |            |
 *    |____________|
 * startDst       endDst
 *
 */

export class StraightSection extends Section {
    startSrc: Point
    startDst: Point
    endSrc: Point
    endDst: Point

    constructor(name: string, startSrc: Point, startDst: Point, endSrc: Point, endDst: Point) {
        super(name)
        this.startSrc = startSrc;
        this.startDst = startDst;
        this.endSrc = endSrc;
        this.endDst = endDst;
    }

    computeArea(): number {
        const a1 = normalize(this.startSrc, this.endDst)
        const b1 = normalize(this.startDst, this.startSrc)
        const angle1 = acos(dot(
            sub(this.endDst, this.startDst),
            sub(this.endDst, this.startSrc)
        ) / (normalize(this.endDst, this.startDst) * normalize(this.endDst, this.startSrc)))
        const area1 = areaOfTriangle(a1, b1, angle1)

        const a2 = normalize(this.startDst, this.endSrc)
        const b2 = normalize(this.startSrc, this.startDst)
        const angle2 = acos(dot(
            sub(this.endSrc, this.startSrc),
            sub(this.endSrc, this.startDst)
        ) / (normalize(this.endSrc, this.startSrc) * normalize(this.endSrc, this.startDst)))
        const area2 = areaOfTriangle(a2, b2, angle2)

        return area1 + area2
    }

    computePath() {
        this.path = [
            centerOf(this.startSrc, this.startDst),
            centerOf(this.endSrc, this.endDst)
        ]
    }

    getLines(): Line[] {
        const lines: Line[] = []
        lines.push({
            path: [this.startSrc, this.startDst],
            style: {style: "#000000", lineDash: [5, 15], lineWidth: 2}
        })

        lines.push({
            path: [this.endSrc, this.endDst],
            style: {style: "#000000", lineDash: [5, 15], lineWidth: 2}
        })

        lines.push({
            path: [this.startSrc, this.endSrc],
            style: {style: "#000000", lineDash: [], lineWidth: 3}
        })

        lines.push({
            path: [this.startDst, this.endDst],
            style: {style: "#000000", lineDash: [], lineWidth: 3}
        })

        return lines;
    }


}
