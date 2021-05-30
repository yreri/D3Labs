/*
*    main_LoadingData.js
*/

var margin = {top: 10, right: 10, bottom: 100, left:100};
var width = 600;
var height = 400;
var flag = true;

var g = d3.select("#chart-area").append("svg")
                                	.attr("width", width + margin.right + margin.left)
                                	.attr("height", height + margin.top + margin.bottom)
                                  .append("g")
                                  .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");


var x = d3.scaleBand()
          .range([0,width])
          .padding(0.2);

var y = d3.scaleLinear()
          .range([0,height]);

var xAxisGroup = g.append("g")
                  .attr("class", "x axis")
                  .attr("transform", "translate(0, " + height + ")");

var yAxisGroup = g.append("g")
                  .attr("class", "y-axis");
g.append("text")
  .attr("class", "x axis-label")
  .attr("x", (width / 2))
  .attr("y", (height+60))
  .attr("font-size", "30px")
  .attr("text-anchor", "middle")
  .style("fill","#0A2239")
  .text("Month");

var yLabel = g.append("text")
              .attr("class", "y axis-label")
              .attr("x", - (height / 2))
              .attr("y", - 60)
              .attr("font-size", "30px")
              .attr("text-anchor", "middle")
              .attr("transform", "rotate(-90)")
              .style("fill","#0A2239");



d3.json("data/revenues.json").then((data)=> {
  	data.forEach((d)=>{
  		d.revenue = +d.revenue;
      d.profit= +d.profit;
  	});


    d3.interval( ( ) => {
    		console.log("Hello World");
        update(data);
        flag = !flag;
    }, 1000);

    update(data);

    }).catch((error)=>{
      console.log(error)
    });


function update(data){
  var value = flag ? "revenue" : "profit";
  var names = data.map((d) => { return d.month; }) ;
  x.domain(names);
  y.domain([d3.max(data, function(d){ return d[value]; }), 0]);
  var rects = g.selectAll("rect")
               .data(data);

  rects.exit().remove();

  rects.attr("x", (d) => { return x(d.month); })
      .attr("y", (d) => { return y(d[value]); })
      .attr("width", x.bandwidth)
	    .attr("height", (d)=>{return height - y(d[value])})
      .attr("fill", (d)=>{if(flag){return "#53A2BE"}; return "#1D84B5"});;

  rects.enter().append("rect")
    	.attr("x", (d) => { return x(d.month); })
    	.attr("y", (d) => { return y(d[value]); })
    	.attr("width", x.bandwidth)
    	.attr("height", (d)=>{return height - y(d[value])})
      .attr("fill", (d)=>{if(flag){return "#53A2BE"}; return "#1D84B5"});

  var bottomAxis = d3.axisBottom(x);

  xAxisGroup.call(bottomAxis)
            .selectAll("text")
            .attr("text-anchor", "center")
            .attr("fill", "#0A2239");

  var leftAxis = d3.axisLeft(y)
                  .ticks(10)
                  .tickFormat((d) => { return "$" + d/1000 + "K"; });



  yAxisGroup.call(leftAxis);

  var label = flag ? "Revenue" : "Profit";

  yLabel.text(label + " (Dlls.)")
      .attr("fill", "#0A2239");

}