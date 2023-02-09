import React, { useState } from 'react';
import Sketch from "react-p5";

function App() {
    const [circles, setCircles] = useState([]);  // initial state with one circle
    const [lines, setLines] = useState([]); // initial state with no lines
    const [selectedCircles, setSelectedCircles] = useState([]); // initial state with no selected circles
    const [selectedLine, setSelectedLine] = useState(-1);
    const [segments, setSegments] = useState([]); // initial state with no segments
    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(800, 500).parent(canvasParentRef);
    }

    const mousePressed = p5 => {

        const index = circles.findIndex(circle => p5.dist(circle.x, circle.y, p5.mouseX, p5.mouseY) < 50);
        if (index === -1) {
            setCircles([...circles, { x: p5.mouseX, y: p5.mouseY }]);
        } else {
            setSelectedCircles([...selectedCircles, index]);
            if (selectedCircles.length === 2) {
                setLines([...lines, { x1: circles[selectedCircles[0]].x, y1: circles[selectedCircles[0]].y, x2: circles[selectedCircles[1]].x, y2: circles[selectedCircles[1]].y
                }]);
                setSelectedCircles([]);
            }
        }
    }

    const draw = p5 => {
        p5.background(255, 204, 0);
        p5.fill(255);
        p5.strokeWeight(10);
        if (circles.length > 0) {
            circles.forEach((circle, index) => {
                p5.circle(circle.x, circle.y, 50, 50);
                if (selectedCircles.includes(index)) {
                    p5.strokeWeight(2);
                    p5.rect(circle.x - 25, circle.y - 25, 50, 50);
                    p5.strokeWeight(10);
                }
            });
        }
        if (lines.length > 0) {
            lines.forEach(line => {
                p5.line(line.x1, line.y1, line.x2, line.y2);
            });
        }
    }
    const mouseDragged = p5 => {
        const index = circles.findIndex(circle => p5.dist(circle.x, circle.y, p5.mouseX, p5.mouseY) < 50);
        if (index !== -1) {
            const newCircles = [...circles];
            newCircles[index] = { x: p5.mouseX, y: p5.mouseY };
            setCircles(newCircles);

            const newLines = [...lines];

            newLines.forEach(line => {
                if (line.x1 === circles[index].x && line.y1 === circles[index].y) {
                    line.x1 = p5.mouseX;
                    line.y1 = p5.mouseY;
                }
                if (line.x2 === circles[index].x && line.y2 === circles[index].y) {
                    line.x2 = p5.mouseX;
                    line.y2 = p5.mouseY;
                }
            });
        }
    }

    const mouseReleased = p5 => {
        if (selectedLine !== -1) {
            const line = lines[selectedLine];
            const x1 = line.x1;
            const y1 = line.y1;
            const x2 = line.x2;
            const y2 = line.y2;
            const m = (y2 - y1) / (x2 - x1);
            const b = y1 - m * x1;
            const x = p5.mouseX;
            const y = m * x + b;
            const newSegments = [...segments, { x, y }];
            setSegments(newSegments);
        }
    }

    const mouseClicked = p5 => {
        const selectedSegmentIndex = segments.findIndex(segment => {
            const distance = p5.dist(segment.x, segment.y, p5.mouseX, p5.mouseY);
            return distance < 10;
        });
    }
    const handleButtonClick = () => {
        setCircles([...circles, { x: 50, y: 50 }]);  // add new circle to state
    }


        return (
        <div className="App">
            <Sketch setup={setup} draw={draw}  mousePressed={mousePressed} mouseDragged={mouseDragged}
            />
            <button onClick={handleButtonClick}>Add Circle</button>
        </div>
    );

}
export default App;