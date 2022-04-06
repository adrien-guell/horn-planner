import React, {useRef, useState} from 'react';
import './App.css';
import {Canvas} from "../../components/Canvas";
import {Point} from "../../../models/Point";
import {DrawMode} from "../../DrawMode";
import useEventListener from "../../../hooks/useEventListener";
import useMouse from '@react-hook/mouse-position';


function App() {
    let origin = {x: 0, y: 0}

    const ref = useRef(null)
    const mouse = useMouse(ref)

    const [mode, setMode] = useState<DrawMode>("Point")

    const onClick = (event: Event) => {
        if (!mouse.isOver)
            return
        if (mode === "Point") {
            origin = {x: mouse.x!, y: mouse.y!}
            setMode("Line")
        }

    }

    useEventListener("click", onClick)

    return (
        <div className="App">
            <div ref={ref}>
                <Canvas origin={origin}/>
            </div>
        </div>
    );
}

export default App;
