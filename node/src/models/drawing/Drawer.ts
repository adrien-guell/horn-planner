import {Canvas, CanvasRenderingContext2D, createCanvas} from "canvas";
import {Point} from "../geometry/Point";
import {color, defaultStyle, Style} from "./Style";
import fs from "fs";
import {Line} from "./Line";
import {Horn} from "../components/Horn";


export class Drawer {
    canvas!: Canvas
    context!: CanvasRenderingContext2D
    padding: number
    width!: number
    height!: number
    nbOfStrokes: number

    constructor(width: number = 0, height: number = 0, padding: number = 30, backgroundColor: string = "#FFFFFF") {
        this.initCanvas(width, height, backgroundColor)
        this.nbOfStrokes = 0
        this.padding = padding
    }

    initCanvas(width: number, height: number, backgroundColor: string = "#FFFFFF") {
        this.width = width
        this.height = height
        this.canvas = createCanvas(width, height);
        this.context = this.canvas.getContext('2d');
        this.context.fillStyle = backgroundColor
        this.context.fillRect(0, 0, width, height)
    }

    /** Draw **/
    drawPlan(plan: Horn) {
        for (let volume of plan.volumes) {
            this.strokeLines(volume.getOutlines())
            this.strokePath(volume.path, color("#de1616"), true)
        }
        for (let section of plan.getSegments()) {
            this.strokeLine(section.getLine())
        }
        this.saveAsFile('image.png')
    }

    strokeLines(lines: Line[]) {
        for (let line of lines)
            this.strokeLine(line)
    }

    strokeLine(line: Line) {
        this.strokePath(line.path, line.style, false)
    }

    strokePath(path: Point[], style: Style = defaultStyle, points: boolean = false) {
        if (path.length >= 2)
            this.stroke(() => {
                this.moveTo(path[0])
                for (let point of path.slice(1))
                    this.lineTo(point)
            }, style)

        if (points)
            for (let point of path)
                this.drawPoint(point, style)
    }

    /** Wrappers **/
    stroke(drawFunction: () => void, style: Style = defaultStyle) {
        this.context.beginPath()
        drawFunction()
        this.context.lineWidth = style.lineWidth
        this.context.strokeStyle = style.style
        this.context.setLineDash(style.lineDash)
        this.context.stroke()
        ++this.nbOfStrokes
        this.saveAsFile(`tmp/tmp-${this.nbOfStrokes.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
        })}.png`)
    }

    moveTo(point: Point) {
        const fixedPoint = this.getFixedPoint(point)
        this.context.moveTo(fixedPoint.x, fixedPoint.y)
    }

    lineTo(point: Point) {
        const fixedPoint = this.getFixedPoint(point)
        this.context.lineTo(fixedPoint.x, fixedPoint.y)
    }

    drawPoint(point: Point, style: Style = defaultStyle) {
        const fixedPoint = this.getFixedPoint(point)
        this.context.beginPath()
        this.context.fillStyle = style.style
        this.context.arc(fixedPoint.x, fixedPoint.y, 2, 0, Math.PI * 2, true)
        this.context.fill()
    }

    getFixedPoint(point: Point) {
        this.checkAndFixCanvasSize({x: point.x + this.padding, y: this.height - point.y - this.padding})
        return {x: point.x + this.padding, y: this.height - point.y - this.padding}
    }

    checkAndFixCanvasSize(point: Point) {
        const changeWidth = this.width <= point.x
        const changeHeight = 0 >= point.y
        if (changeWidth || changeHeight) {
            let width: number
            if (changeWidth) width = point.x + this.padding
            else width = this.width

            let height: number
            if (changeHeight) height = this.height - point.y + this.padding
            else height = this.height

            const oldCanvas = this.canvas
            this.initCanvas(width, height)
            this.context.drawImage(oldCanvas, 0, height - oldCanvas.height)
        }
    }

    /** Utils **/
    saveAsFile(filename: string) {
        const buffer = this.canvas?.toBuffer('image/png')
        if (buffer)
            fs.writeFileSync(filename, buffer)
    }
}
