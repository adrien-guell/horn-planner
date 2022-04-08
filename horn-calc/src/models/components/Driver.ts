export class Driver {
    windingHeight: number
    speakerDiameter: number
    speakerHeight: number
    magnetDiameter: number
    magnetHeight: number
    baffleThickness: number
    flushMount: number


    constructor(windingHeight: number, speakerDiameter: number, speakerHeight: number, magnetDiameter: number, magnetHeight: number, baffleThickness: number, flushMount: number) {
        this.windingHeight = windingHeight;
        this.speakerDiameter = speakerDiameter;
        this.speakerHeight = speakerHeight;
        this.magnetDiameter = magnetDiameter;
        this.magnetHeight = magnetHeight;
        this.baffleThickness = baffleThickness;
        this.flushMount = flushMount;
    }

    getDriverDisplacement() {
        let windingHeight = this.windingHeight
        let speakerDiameter = this.speakerDiameter
        let speakerHeight = this.speakerHeight
        let magnetDiameter = this.magnetDiameter
        let magnetHeight = this.magnetHeight
        let baffleThickness = this.baffleThickness
        let flushMount = this.flushMount

        if (windingHeight == 0) {
            windingHeight = speakerDiameter * 1.27 // default xmax is 5% of speaker diameter then convert to mm.
            if (windingHeight > speakerHeight / 4.0) {
                windingHeight = speakerHeight / 4.0
            }
        }

        speakerDiameter = speakerDiameter * .75 // outer 12% on each side is above the front plane of the speaker

        let driverDisplacement: number

        if ((magnetDiameter <= 0) || (magnetDiameter <= 0))  // we don't know magnet size, so size is a cone from front of speaker to back of magnet
            driverDisplacement = Math.PI * speakerHeight * (speakerDiameter / 2.0) * (speakerDiameter / 2.0) / 3.0;
        else // we know magnet size, so take magnet size as a cylinder + a cone from front of speaker to back of cone (speaker depth - xmax)
            driverDisplacement = Math.PI * magnetHeight * (magnetDiameter / 2.0) * (magnetDiameter / 2.0)
                + Math.PI * (speakerHeight - magnetHeight - windingHeight)
                * (speakerDiameter / 2.0) * (speakerDiameter / 2.0) / 3.0;
        driverDisplacement -= Math.PI * baffleThickness * (speakerDiameter / 2.0) * (speakerDiameter / 2.0);    // subtract the area we cut out of the front baffle

        if (flushMount == 1)
            driverDisplacement += Math.PI * 6 * (speakerDiameter / 2.0) * (speakerDiameter / 2.0);    // For flush mount, add back 1/4" of the baffle area

        return driverDisplacement
    }
}
