export type Style = {
    style: string | CanvasGradient | CanvasPattern
    lineDash: number[]
    lineWidth: number
}

export const color = (color: string) => { return {style: color, lineDash: [], lineWidth: 1} }
export const defaultStyle = {style: "#000000", lineDash: [], lineWidth: 1}
