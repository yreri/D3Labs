/*
*    main.js
*/

var svg = d3.select("#chart-area").append("svg")
                                	.attr("width", 400)
                                	.attr("height", 400);
var c1 = svg.append("circle")
            .attr("cx", 100)
            .attr("cy", 250)
            .attr("r", 65)
            .attr("fill", "blue")
            .attr("style", "stroke:red");

var c2 = svg.append("circle")
            .attr("cx", 260)
            .attr("cy", 75)
            .attr("r", 65)
            .attr("fill", "blue")
            .attr("style", "stroke:red");

var r1 = svg.append("rect")
            .attr("x", 40)
            .attr("y", 20)
            .attr("width", 120)
            .attr("height", 120)
            .attr("fill", "red")
            .attr("style", "stroke:blue");

var r1 = svg.append("rect")
            .attr("x", 200)
            .attr("y", 200)
            .attr("width", 120)
            .attr("height", 120)
            .attr("fill", "red")
            .attr("style", "stroke:blue");

