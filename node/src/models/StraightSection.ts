import {Point} from "./Point";
import {Section} from "./Section";
import {Rotation} from "./Rotation";
import {centerOf} from "../geometry";


/**
 *
 * startDst         endDst
 *    |------------|
 *    |            |
 *    |            |
 *    |----------->|
 *    |            |
 *    |____________|
 * startSrc       endSrc
 *
 */

export class StraightSection implements Section {
    startSrc: Point
    startDst: Point
    endSrc: Point
    endDst: Point
    position: Point
    rotation: Rotation
    path: Point[]

    constructor(startSrc: Point, startDst: Point, endSrc: Point, endDst: Point, position: Point, rotation: Rotation) {
        this.startSrc = startSrc;
        this.startDst = startDst;
        this.endSrc = endSrc;
        this.endDst = endDst;
        this.position = position;
        this.rotation = rotation;
        this.path = [];
    }

    strokePath(context: any) {
        throw new Error("Method not implemented.");
    }

    computeLength() {
    }

    computePath() {
        this.path = [
            centerOf(this.startSrc, this.startDst),
            centerOf(this.endSrc, this.endDst)
        ]
    }


}
