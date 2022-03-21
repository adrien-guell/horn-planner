import {Section} from "./Section";

export class Plan {
    sections: Section[]

    constructor(sections: Section[]) {
        this.sections = sections
    }

    computePaths() {
        this.sections.forEach(section => section.computePath())
    }

    computeLength(): number {
        return this.sections.map(section => {
            const length = section.computeLength() * 1.2
            console.log(`${section.name}L = ${length}`)
            return length
        })
            .reduce((a, b) => a + b, 0)
    }

    computeArea(): number {
        return this.sections.map(section => {
            const area = section.computeArea()
            console.log(`${section.name} = ${area}`)
            return area
        })
            .reduce((a, b) => a + b, 0)
    }
}
