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

    getName(): string {
        return `L${this.start.id}${this.end.id}`
    }

    getLength(): number {
        let sum = 0
        const path = this.getPath()
        for (let i = 1; i < path.length; i++)
            sum += normalize(path[i - 1], path[i])
        return sum
    }

    printLength() {
        const length = this.getLength() * 1.2
        console.log(`${this.getName()} = ${(length / 10).toFixed(2)}cm`)
    }
}
