/*
*    main_LoadingData.js
*/

var svg = d3.select("#chart-area").append("svg")
                                	.attr("width", 850)
                                	.attr("height", 850);

d3.json("data/buildings.json").then((data)=> {
  	data.forEach((d)=>{
  		d.height = +d.height;
  	});
    console.log(data)

    var rects = svg.selectAll("rect")
                    .data(data)
    rects.enter()
         .append("rect")
             .attr("x", (d, i) =>{return 70 + i * 60})
             .attr("y", (d)=>{return 850 - d.height})
             .attr("width", 50)
             .attr("height", (d)=>{return d.height})
             .attr("fill","lightskyblue");

    }).catch((error)=>{
      console.log(error)
    });
