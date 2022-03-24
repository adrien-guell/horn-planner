import {Point} from "../../geometry/Point";
import {normalize} from "../../../geometry";
import {Line} from "../../drawing/Line";
import {Segment} from "../Segment";

export abstract class Volume {
    start: Segment
    end: Segment

    protected constructor(start: Segment, end: Segment) {
        this.start = start
        this.end = end
    }

    abstract getPath(): Point[]
    abstract getOutlines(): Line[]

    printLength() {
        const length = this.getLength() * 1.2
        console.log(`${this.getName()} = ${(length / 10).toFixed(2)}cm`)
    }

    getName(): string {
        return `L${this.start.id}${this.end.id}`
    }

    getLength() {
        this.getPath().reduce((prev, curr) => normalize(prev, curr))
    }
}
