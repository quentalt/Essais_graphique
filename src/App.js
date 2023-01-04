import React, {useEffect, useRef} from "react";
import * as d3 from "d3";
import {IconButton} from "@mui/material";
import CircleIcon from '@mui/icons-material/Circle';
import {HorizontalRule} from "@mui/icons-material";

export default function App() {
    const ref = useRef()
    let line = null
    let start = null

    const addCircle = () => {
        const svgElement = d3.select(ref.current)

        const drag = d3.drag()
            .on("start", dragStart)
            .on("drag", dragging)
            .on("end", dragEnd)


        function dragStart(event) {
            d3.select(this).raise().classed("active", true);
        }

        function dragging(event) {
            d3.select(this)
                .attr("cx", event.x)
                .attr("cy", event.y);
        }

        function dragEnd() {
            d3.select(this).attr("stroke", "black").classed("active", false);
        }


        svgElement.append("circle")
            .attr("cx", Math.random() * 300, d => d.x)
            .attr("cy", Math.random() * 140, d => d.y)
            .attr("r", 10)
            .attr("fill", "white")
            .attr("stroke", "black")
            .attr("stroke-width", 4)
            .call(drag)
    }

    function  addLine() {
        const svgElement = d3.select(ref.current)

        const drag = d3.drag()
            .on("start", dragStart)
            .on("drag", dragging)
            .on("end", dragEnd)

        function dragStart(event) {
            d3.select(this).raise().classed("active", true);
        }

        function dragging(event) {
            d3.select(this)
                .attr("x1", event.x)
                .attr("y1", event.y);
        }

        function dragEnd() {
            d3.select(this).attr("stroke", "black").classed("active", false);
        }

        svgElement.append("line")
            .attr("x1", Math.random() * 300, d => d.x)
            .attr("y1", Math.random() * 140, d => d.y)
            .attr("x2", Math.random() * 300, d => d.x)
            .attr("y2", Math.random() * 140, d => d.y)
            .attr("stroke", "black")
            .attr("stroke-width", 4)
            .call(drag)

        function circleContextMenu(event) {
            event.preventDefault()
            if (!start) {
                start = d3.select(this.parentNode).select("circle:first-of-type")
            } else {
                if (!line) {
                    line = d3.select(ref.current).append("line")
                        .attr("stroke", "green")
                }
                updateLine()
                start = null
            }
        }

        function updateLine() {
            const end = d3.select(this.parentNode).select("circle:first-of-type")
            line.attr("x1", start.attr("cx"))
                .attr("y1", start.attr("cy"))
                .attr("x2", end.attr("cx"))
                .attr("y2", end.attr("cy"))
        }
    }





    /*function circleClick(event, d) {
        event.preventDefault()
        if (!start) {
            start = d3.select(this.parentNode).select("circle:first-of-type")
        } else {
            if (!line) {
                line = d3.select(ref.current).append("line")
            }
            line
                .attr("x1", start.attr("cx"))
                .attr("y1", start.attr("cy"))
                .attr("x2", d3.select(this.parentNode).select("circle:first-of-type").attr("cx"))
                .attr("y2", d3.select(this.parentNode).select("circle:first-of-type").attr("cy"))
                .attr("stroke", "black")
            start = null
        }
    }
*/

        return (
            <div>
                <IconButton onClick={addCircle}>
                    <CircleIcon/>
                </IconButton>
                <IconButton>
                    <HorizontalRule onClick={addLine}/>
                </IconButton>
                <svg width={1000} height={1000} ref={ref}/>

            </div>
        )

}
