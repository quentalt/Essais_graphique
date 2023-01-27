import React, { useState } from 'react';
import Sketch from "react-p5";

function App() {
    const [circles, setCircles] = useState([]);  // initial state with one circle
    const [lines, setLines] = useState([]); // initial state with no lines

    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(800, 500).parent(canvasParentRef);
    }

    const mousePressed = p5 => {
         setCircles([...circles, { x: p5.mouseX, y: p5.mouseY }]);
    if (circles.length >= 2) {
        setLines([...lines, { x1: circles[circles.length - 2].x, y1: circles[circles.length - 2].y, x2: circles[circles.length - 1].x, y2: circles[circles.length - 1].y
         }]);
    }
    }
    
    const draw = p5 => {
        p5.background(255, 204, 0);
        p5.fill(255);
        p5.strokeWeight(10);
        if (circles.length > 0) {
            circles.forEach(circle => {
                p5.circle(circle.x, circle.y, 50, 50);
            });
        }
        if (lines.length > 0) {
            lines.forEach(line => {
                p5.line(line.x1, line.y1, line.x2, line.y2);
            });
        }
    }

    /* const mouseDragged = p5 => {
        const index = circles.findIndex(circle => p5.dist(circle.x, circle.y, p5.mouseX, p5.mouseY) < 50);
        if (index !== -1) {
            const newCircles = [...circles];
            newCircles[index] = { x: p5.mouseX, y: p5.mouseY };
            setCircles(newCircles);
        }
    } */

    const handleButtonClick = () => {
        setCircles([...circles, { x: 50, y: 50 }]);  // add new circle to state
    }



    return (
        <div className="App">
            <Sketch setup={setup} draw={draw} mousePressed={mousePressed} />
            <button onClick={handleButtonClick}>Add Circle</button>
        </div>
    );
    
}
export default App;