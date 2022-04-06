import {Segment} from "../models/components/Segment";
import {CornerVolume} from "../models/components/volume/CornerVolume";
import {StraightVolume} from "../models/components/volume/StraightVolume";
import {ThroatChamber} from "../models/components/ThroatChamber";
import {Horn} from "../models/components/Horn";

const s5 = new Segment(
    5,
    {x: 0, y: 0},
    {x: 0, y: 650-350}
)

const s4 = new Segment(
    4,
    {x: s5.top.x + 99 + 15, y: s5.top.y},
    {x: s5.bottom.x + 99 + 15, y: s5.bottom.y}
)

const s3 = new Segment(
    3,
    {x: s4.bottom.x + 340-30-99, y: s4.bottom.y},
    s4.bottom
)

const s2 = new Segment(
    2,
    {x: s3.top.x, y: s3.top.y + 350 - 80},
    {x: s3.top.x - 115, y: s3.top.y + 350 - 80}
)

const s1 = new Segment(
    1,
    {x: s2.bottom.x, y: s2.bottom.y + 80},
    s2.bottom
)

const l12 = new CornerVolume(
    s1,
    s2,
    {x: s2.top.x, y: s1.top.y}
)

const l23 = new StraightVolume(
    s2,
    s3
)

const l34 = new CornerVolume(
    s3,
    s4,
    {x: s3.top.x, y: s4.top.y}
)

const l45 = new StraightVolume(
    s4,
    s5
)

const driver = new Segment(
    -2,
    {x: s5.bottom.x + 15, y: s5.bottom.y + 350},
    {x: s5.bottom.x + 15, y: s5.bottom.y + 15}
)

const a = {x: driver.bottom.x + 99 - 16, y: driver.bottom.y}
const b = {x: s1.bottom.x - 16, y: a.y + 260.9}
const c = {x: b.x, y: b.y + 350 - 15 - 260.9}

const a1 = new Segment(
    -1,
    c,
    b
)
const adaptor = new StraightVolume(
    a1,
    s1
)

const chamber = new ThroatChamber(
    driver,
    [
        c,
        driver.top,
        driver.bottom,
        a,
        b,
    ],
    adaptor
)

export const plan = new Horn(350, [l12, l23, l34, l45], chamber, 4178318)
