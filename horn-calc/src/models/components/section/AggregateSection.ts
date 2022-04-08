import {Line} from "../../drawing/Line";
import {Segment} from "../Segment";
import {Section} from "./Section";
import {Point} from "../../geometry/Point";

export class AggregateSection extends Section {
    sections: Section[]

    constructor(sections: Section[]) {
        if (sections.length < 2)
            throw "Cannot instantiate an aggregate section with less than two sections"
        super(sections[0].start, sections[sections.length - 1].end);
        this.sections = sections;
    }

    getPath(): Point[] {
        return this.sections.reduce((acc: Point[], section: Section) => acc.concat(section.getPath()), [])
    }

    getOutlines(): Line[] {
        return this.sections.map(section => section.getOutlines()).reduce((a, b) => a.concat(b));
    }
}
