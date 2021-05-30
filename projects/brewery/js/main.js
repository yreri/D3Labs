/*
*    main_LoadingData.js
*/

var margin = {top: 10, right: 10, bottom: 100, left:100};
var width = 600;
var height = 400;

var g = d3.select("#chart-area").append("svg")
                                	.attr("width", width + margin.right + margin.left)
                                	.attr("height", height + margin.top + margin.bottom)
                                  .append("g")
                                  .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

d3.json("data/revenues.json").then((data)=> {
  	data.forEach((d)=>{
  		d.revenue = +d.revenue;
  	});
    console.log(data);

    var names = data.map((d) => { return d.month; }) ;

    var y = d3.scaleLinear()
            	.domain([d3.max(data, (d) => { return d.revenue; }), 0])
            	.range([0,height]);

    var x = d3.scaleBand()
            	.domain(names)
            	.range([0,width])
            	.paddingInner(0.3)
            	.paddingOuter(0.3);

    var rects = g.selectAll("rect")
                    .data(data);
    rects.enter()
         .append("rect")
             .attr("x", (d) =>{return x(d.month)})
             .attr("y", (d)=>{return y(d.revenue)})
             .attr("width", x.bandwidth())
             .attr("height", (d)=>{return height - y(d.revenue)})
             .attr("fill","gold");

    var bottomAxis = d3.axisBottom(x);

    g.append("g")
	     .attr("class", "bottom axis")
   	   .attr("transform", "translate(0, " + height + ")")
   	   .call(bottomAxis)
       .selectAll("text")
         .attr("text-anchor", "center");

    var leftAxis = d3.axisLeft(y)
                    .ticks(10)
                    .tickFormat((d) => { return "$" + d/1000 + "K"; });
    g.append("g")
   	  .attr("class", "left axis")
   	  .call(leftAxis);

    g.append("text")
		.attr("class", "x axis-label")
		.attr("x", (width / 2))
		.attr("y", 10)
		.attr("font-size", "30px")
		.attr("text-anchor", "middle")
		.style("fill","black")
		.text("Month");

    g.append("text")
    	.attr("class", "y axis-label")
    	.attr("x", - (height / 2))
    	.attr("y", - 60)
    	.attr("font-size", "30px")
    	.attr("text-anchor", "middle")
    	.attr("transform", "rotate(-90)")
    	.style("fill","black")
    	.text("Revenue (Dlls.)");

    d3.interval( (d) => {

    	}, 1000);

    }).catch((error)=>{
      console.log(error)
    });

