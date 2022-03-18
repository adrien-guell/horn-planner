import {Point} from "./Point";
import {Rotation} from "./Rotation";

export interface Section {
    position: Point
    rotation: Rotation
    path?: Point[]
    computePath(): void
    computeLength(): void
    strokePath(context: any): void
}
