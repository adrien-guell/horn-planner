import {Point} from "../../geometry/Point";
import {normalize} from "../../../geometry";
import {Line} from "../../drawing/Line";
import {Segment} from "../Segment";

export abstract class Volume {
    path: Point[]
    start: Segment
    end: Segment

    protected constructor(start: Segment, end: Segment) {
        this.path = []
        this.start = start
        this.end = end
    }

    abstract computePath(): void
    abstract getOutlines(): Line[]

    getName(): string {
        return `L${this.start.id}${this.end.id}`
    }

    computeLength() {
        if (!this.path) {
            console.log("Section: Forcing path computation")
            this.computePath()
        }

        let sum = 0
        for (let i = 0; i < this.path!.length - 1; i++)
            sum += normalize(this.path![i], this.path![i + 1])
        return sum
    }
}
