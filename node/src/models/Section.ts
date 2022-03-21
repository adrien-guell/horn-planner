import {Point} from "./Point";
import {normalize} from "../geometry";
import {Line} from "./Line";

export abstract class Section {
    path: Point[]
    name: string

    protected constructor(name: string) {
        this.name = name
        this.path = []
    }

    abstract computePath(): void
    abstract getLines(): Line[]
    abstract computeArea(): number

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
