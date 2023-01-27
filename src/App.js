import React, {useEffect, useRef, useState} from 'react';
import * as d3 from 'd3';

function App() {
    const svgRef = useRef(null);
    const [data, setData] = useState([{ x: 50, y: 50 }, { x: 100, y: 100 }, { x: 150, y: 150 }]);
    const [selectedCircle, setSelectedCircle] = useState(null);

    useEffect(() => {
        const svg = d3.select(svgRef.current);

        // Add circles with black borders
        svg
            .selectAll('circle')
            .data(data)
            .join('circle')
            .attr('cx', d => d.x)
            .attr('cy', d => d.y)
            .attr('r', 20)
            .attr('stroke-width', 6)
            .attr('stroke', 'black')
            .attr('fill', 'white')
            .on('mousedown', (d, i, n) => {
                d.xStart = d3.event.x;
                d.yStart = d3.event.y;
                d3.select(n[i]).raise();
            })
            .on('mousemove', (d) => {
                if (d.xStart) {
                    d.x = d3.event.x;
                    d.y = d3.event.y;
                    d3.select(this).attr('cx', d.x).attr('cy', d.y);
                }
            })
            .on('mouseup', (d) => {
                d.xStart = null;
                d.yStart = null;
            })
            .on('click', (d, i, n) => {
                if (selectedCircle) {
                    svg
                        .append('line')
                        .attr('x1', selectedCircle.x)
                        .attr('y1', selectedCircle.y)
                        .attr('x2', d.x)
                        .attr('y2', d.y)
                        .attr('stroke', 'black');
                    setSelectedCircle(null);
                } else {
                    setSelectedCircle(d);
                }
            });

    }, [data, selectedCircle]);

    return (
        <svg ref={svgRef} width={500} height={500}>
        </svg>
    );
}

export default App;
