import {createCanvas} from 'canvas';
import * as fs from "fs";
import {Point} from "./models/Point";
import {CornerSection} from "./models/CornerSection";
import {Section} from "./models/Section";
import {centerOf, rotate} from "./geometry";
import {Rotation} from "./models/Rotation";



const corner1 = new CornerSection(
    {x: 3, y: 400},
    {x: 430, y: 389},
    {x: 6, y: 10},
    {x: 412, y: 328},
    {x: 0, y: 0},
    0
)

corner1.computePath()
console.log(corner1.computeLength() * 1.2)



const canvas = createCanvas(500, 500);
const context = canvas.getContext('2d');
context.fillStyle = "#FFFFFF"
context.fillRect(0, 0, canvas.width, canvas.height)
const safeZone = 50
cornerToStroke(corner1)
pathToStroke(getFixedPath(corner1.path), "#c03434")


const buffer = canvas.toBuffer('image/png')
fs.writeFileSync('./image.png', buffer)


function cornerToStroke(section: CornerSection, style: string | CanvasGradient | CanvasPattern = "#000000") {
    stroke(() => {
        moveTo(getFixedPoint(section.centerOfRotation))
        lineTo(getFixedPoint(section.start))
        moveTo(getFixedPoint(section.centerOfRotation))
        lineTo(getFixedPoint(section.end))
    }, style, [5, 15])

    stroke(() => {
        moveTo(getFixedPoint(section.opposite))
        lineTo(getFixedPoint(section.start))
        moveTo(getFixedPoint(section.opposite))
        lineTo(getFixedPoint(section.end))
    }, style)

    stroke(() => {
        moveTo(getFixedPoint(centerOf(section.centerOfRotation, section.start)))
        lineTo(getFixedPoint(centerOf(section.end, section.opposite)))
        moveTo(getFixedPoint(centerOf(section.centerOfRotation, section.end)))
        lineTo(getFixedPoint(centerOf(section.start, section.opposite)))
    })
}

function pathToStroke(path: Point[], style: Style = "#000000") {
    stroke(() => {
        moveTo(path[0])
        path.slice(1).forEach(lineTo)
    }, style)
    path.forEach(point => drawPoint(point, style))
}

function stroke(drawFunction: () => void, style: Style = "#000000", dash: number[] = []) {
    context.beginPath()
    context.setLineDash(dash)
    context.strokeStyle = style
    drawFunction()
    context.stroke()
}

function moveTo(point: Point) {
    context.moveTo(point.x, point.y)
}

function lineTo(point: Point) {
    context.lineTo(point.x, point.y)
}

function drawPoint(point: Point, style: Style = "#000000") {
    context.beginPath()
    context.fillStyle = style
    context.arc(point.x, point.y, 2, 0, Math.PI * 2, true)
    context.fill()
}

function getFixedPoint(point: Point) {
    return {x: point.x + safeZone, y: canvas.height - point.y - safeZone}
}

function getFixedPath(path: Point[]) {
    return path.map(point => getFixedPoint(point))
}

type Style = string | CanvasGradient | CanvasPattern
