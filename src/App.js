import React, { useState } from 'react';
import Sketch from "react-p5";

function App() {
    const [circles, setCircles] = useState([]);  // initial state with one circle
    const [curvePoints, setCurvePoints] = useState([]);  // initial state with empty array for curve points
    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(800, 500).parent(canvasParentRef);
    }

    const draw = p5 => {
        p5.background(255, 204, 0);
        p5.fill(255);
        p5.strokeWeight(10);
        if (circles.length > 0) {
            circles.forEach(circle => {
                p5.circle(circle.x, circle.y, 50, 50);
                p5.line(circle.x, circle.y, p5.mouseX, p5.mouseY);
            });
        }
    }




    /*const mousePressed = p5 => {
        setCircles([...circles, { x: p5.mouseX, y: p5.mouseY }]);
    }*/

    const mouseDragged = p5 => {
        const index = circles.findIndex(circle => p5.dist(circle.x, circle.y, p5.mouseX, p5.mouseY) < 50);
        if (index !== -1) {
            const newCircles = [...circles];
            newCircles[index] = { x: p5.mouseX, y: p5.mouseY };
            setCircles(newCircles);
            setCurvePoints([...curvePoints, { x: p5.mouseX, y: p5.mouseY }]);
        }
    }

    const handleButtonClick = () => {
        setCircles([...circles, { x: 50, y: 50 }]);  // add new circle to state
    }

    return (
        <>
            <Sketch
                setup={setup}
                draw={draw}
                mouseDragged={mouseDragged}
            />
            <button onClick={handleButtonClick}>Add Circle</button>  // add button
        </>
    );
}

export default App;