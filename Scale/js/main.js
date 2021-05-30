/*
*    main_LoadingData.js
*/

var svg = d3.select("#chart-area").append("svg")
                                	.attr("width", 500)
                                	.attr("height", 500);


var y = d3.scaleLinear()
        	.domain([0, 828])
        	.range([0,400]);

d3.json("data/buildings.json").then((data)=> {
  	data.forEach((d)=>{
  		d.height = +d.height;
  	});
    console.log(data);

    var names = data.map((d) => { return d.name; }) ;
    console.log(names);

    var x = d3.scaleBand()
            	.domain(names)
            	.range([0,400])
            	.paddingInner(0.3)
            	.paddingOuter(0.3);

    var colors = d3.scaleOrdinal()
                    .domain(names)
                    .range(d3.schemeSet3);

    var rects = svg.selectAll("rect")
                    .data(data);
    rects.enter()
         .append("rect")
             .attr("x", (d) =>{return x(d.name) * 1.2})
             .attr("y", (d)=>{return 500 - y(d.height)})
             .attr("width", 40)
             .attr("height", (d)=>{return d.height})
             .attr("fill",(d)=>{return colors(d.name)});

    }).catch((error)=>{
      console.log(error)
    });