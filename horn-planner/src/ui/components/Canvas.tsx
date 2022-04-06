import {useEffect, useRef} from "react";
import {Point} from "../../models/Point";

type CanvasProps = {
    origin: Point
}

export const Canvas = (props: CanvasProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) throw "No canvas"
        const context = canvas.getContext('2d')
        if (!context) throw "No context"

        context.
    }, [])

    return (
        <canvas ref={canvasRef}/>
    )
}
