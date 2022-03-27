import {normalize} from "./geometry";
import {CornerVolume} from "./models/components/volume/CornerVolume";
import {Drawer} from "./models/drawing/Drawer";
import {Segment} from "./models/components/Segment";
import {StraightVolume} from "./models/components/volume/StraightVolume";
import {Horn} from "./models/components/Horn";
import {Volume} from "./models/components/volume/Volume";
const sqrt = Math.sqrt
const pow = Math.pow

/*const s8 = new StraightSection(
    "s8",
    {x: 344, y: 363},
    {x: 344, y: 0},
    {x: 0, y: 363},
    {x: 0, y: 0}
)

const s7 = new CornerSection(
    "s7",
    s8.startSrc,
    {x: s8.startSrc.x + 328, y: s8.startSrc.y},
    s8.startDst,
    {x: s8.startDst.x + 328, y: s8.startDst.y}
)

const s6 = new StraightSection(
    "s6",
    {x: s7.start.x - 262, y: s7.centerOfRotation.y + 295},
    {x: s7.start.x, y: s7.start.y + 295},
    s7.centerOfRotation,
    s7.start
)

const s5 = new CornerSection(
    "s5",
    s6.startSrc,
    {x: s6.startSrc.x, y: s6.startSrc.y + 210},
    s6.startDst,
    {x: s6.startDst.x, y: s6.startDst.y + 210}
)

const s4 = new StraightSection(
    "s4",
    {x: s5.centerOfRotation.x - 18, y: s5.centerOfRotation.y + 4},
    {x: s5.start.x - 18, y: s5.start.y},
    s5.centerOfRotation,
    s5.start
)

const s3 = new CornerSection(
    "s3",
    s4.startSrc,
    {x:  s4.startSrc.x - 164, y: s4.startSrc.y},
    s4.startDst,
    {x:  s4.startDst.x - 164, y: s4.startDst.y}
)

const s2 = new StraightSection(
    "s2",
    {x: s3.start.x, y: s3.start.y - 175},
    {x: s3.start.x + 125, y: s3.centerOfRotation.y - 175},
    s3.start,
    s3.centerOfRotation
)

const s1 = new CornerSection(
    "s1",
    s2.startSrc,
    {x: s2.startSrc.x, y: s2.startSrc.y - (501-381-18)},
    s2.startDst,
    {x: s3.centerOfRotation.x - (sqrt(pow(284, 2) - pow( 501-381-18+175, 2))), y: s2.startDst.y - (501-381-18)}
)*/

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

/*TODO faire chambre de compression
* rassembler plusieurs sections
*
*  */

const plan = new Horn(350, [l12, l23, l34, l45])
plan.mergeVolumes(1)
plan.getPath()
plan.printSegmentsArea()
plan.printVolumesLength()

const drawer = new Drawer()
drawer.drawHorn(plan)
drawer.saveAsFile('image.png')
